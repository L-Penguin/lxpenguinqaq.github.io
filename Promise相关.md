# Promise相关深入

## 示例引入

关于`Promise`实例的输出情况:

```javascript
Promise.all([
    new Promise(res=> {
        console.log(1);
        res('res1')
    }),
    new Promise((res, rej)=> {
        console.log(2);
        rej('rej2');
    })
]).then(v=> {
    console.log('all_then1 ==== ', v);
}).catch(e=> {
    console.log('all_catch1 === ', e);
})
console.log('*'.repeat(7));
Promise.all([
    new Promise(res=> {
        console.log(3);
        res('res3');
    }),
    new Promise(res=> {
        console.log(4);
        res('res4');
    }),
    new Promise(res=> {
        console.log(5);
        res('res5');
    })
]).then(v=> {
    console.log('all_then2 ==== ', v);
}).catch(e=> {
    console.log('all_catch2 === ', e);
})
console.log('*'.repeat(17));
```

输出为：

```javascript
1
2
*******
3
4
5
*****************
all_then2 === ['res3', 'res4', 'res5']
all_catch1 === rej2
```

## 解释过程

首先`Promise.all()`其中接收的参数是一个数组，数组中存放`Promise`实例，如果不是`Promise`实例，会按照一定规则转换成对应的`Promise`实例。并且会同步执行其中的`Promise`实例中传入的函数；，然后改变`Promise`为响应的状态。`.then`和`.catch`为微任务。

所以执行同步的任务，即先清理任务队列，再处理微任务，在解决宏任务（每解决一个宏任务，会去再次解决清空微任务队列）。

代码执行过程：

| 任务队列                          | 微任务                                           | 宏任务 |
| --------------------------------- | ------------------------------------------------ | ------ |
| ~~`console.log(1)`~~              | `then(v=> {console.log('all_then1 ==== ', v);})` | 无     |
| ~~`console.log(2)`~~              | `then(v=> {console.log('all_then2 === ', v);})`  |        |
| ~~`console.log('*'.repeat(7))`~~  |                                                  |        |
| ~~`console.log(3)`~~              |                                                  |        |
| ~~`console.log(4)`~~              |                                                  |        |
| ~~`console.log(5)`~~              |                                                  |        |
| ~~`console.log('*'.repeat(17))`~~ |                                                  |        |

由于`Promise.all()`本质也是返回一个`Promise`对象，只是状态由参数数组中所有`Promise`实例所决定

此时有两个微任务，分别是由两个`Promise.all()`返回的`Promise`对象`.then()`产生的。

当执行完第一个微任务时：由于`Promise`状态为`rejected`，所以不会执行`.then()`的参数1函数，而第二个参数是`undefined`，所以会返回一个`rej('rej2')`的`rejected`状态的`Promise`对象，同时会产生执行到第三个微任务`catch(console.log('all_catch1 === ', e);)`。

然后执行第二个微任务`then(v=> {console.log('all_then2 === ', v);})`，因为第二个`Promise.all`返回的`Promise`对象状态为`fulfilled`，所以会执行`then()`第一个参数函数，故输出`all_then2 === ['res3', 'res4', 'res5']`，同时返回状态为`fulfilled`且`res(undefined)`的`Promise`对象（具体细节后续会解释）。

所以此时会产生第四个微任务`catch(console.log('all_catch2 === ', e);)`。

| 任务队列                          | 微任务                                               | 宏任务 |
| --------------------------------- | ---------------------------------------------------- | ------ |
| ~~`console.log(1)`~~              | ~~`then(v=> {console.log('all_then1 ==== ', v);})`~~ | 无     |
| ~~`console.log(2)`~~              | ~~`then(v=> {console.log('all_then2 === ', v);})`~~  |        |
| ~~`console.log('*'.repeat(7))`~~  | `catch(console.log('all_catch1 === ', e);)`          |        |
| ~~`console.log(3)`~~              | `catch(console.log('all_catch2 === ', e);)`          |        |
| ~~`console.log(4)`~~              |                                                      |        |
| ~~`console.log(5)`~~              |                                                      |        |
| ~~`console.log('*'.repeat(17))`~~ |                                                      |        |

然后执行第三个微任务，由于此时第一个`Promise.all`返回的状态为`rejected`所以会执行`catch`函数，进行输出。而第四个微任务，由于第二个`Promise.all`返回的是状态为`fulfilled`的`Promise`对象，所以不会执行。

由此可以得出上述的输出顺序。

## 扩展深入

> 这个例子，主要的知识点是在于微任务的处理，其次是在于关于`Promise`对象状态的变化，这就涉及到`then`和`catch`的具体使用了

有官方文档可知：

# Promise.prototype.catch()

**catch()** 方法返回一个[Promise (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)，并且处理拒绝的情况。它的行为与调用[`Promise.prototype.then(undefined, onRejected)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 相同。(事实上，calling `obj.catch(onRejected)` 内部 calls `obj.then(undefined, onRejected)`).

`catch`其实是`then`的语法糖，所以只需要重点理解`then`的工作原理，就可以理解`catch`。

```javascript
p.catch(func) === p.then(undefined, func)
```

关于`then`的用法，重点的是，这个函数的返回。可以将这个`Promise`先简单的理解为一个普通的对象，只不过这个对象的原型对象上有着一些函数（API之类的）可以使用，`then`就是其中一个，它能接收两个参数，且两个参数都需要是函数，且两个函数都会执行，且只会接收第一个参数函数的返回值作为`then`函数的返回`Promise`对象的携带`res`值。

```javascript
// 当Promise对象状态为fulfilled时，两个参数函数的情况
new Promise((res, rej)=> {res(1)}).then(res=>{
        console.log(10, res);
        return 10;
    },
    rej=>{
    console.log(100, rej);
    return 100;
});
/*
10 1
Promise {<fulfilled>: 10}
*/
// 当Promise对象状态为rejected时，两个参数函数的情况
new Promise((res, rej)=> {rej(1)}).then(res=>{
        console.log(10, res);
        return 10;
    },
    rej=>{
    console.log(100, rej);
    return 100;
});
/*
100 1
Promise {<fulfilled>: 100}
*/
```

说明，当`Promise`对象的状态为`fulfilled`时，只会执行第一个参数函数，并且返回新`Promise`对象的状态为`fulfilled`，携带值为第一个函数的返回值。

当`Promise`对象的状态为`rejected`时，只会执行第二个参数函数，并且返回新`Promise`对象的状态为`fulfilled`（除非第二个参数为`undefined`或者`()=>{}`时，这个时候返回状态就和调用`then`函数的对象一样，相当于没有执行`then`函数）。

即可以知道，`then`函数的两个参数函数是否执行是通过调用该函数的`Promise`状态决定的（`fulfilled`执行第一个参数函数，`rejected`执行第二个参数函数）。

执行之后返回的`Promise`对象的状态及携带值判断：返回的`Promise`的状态大多数情况下为`fulfilled`，除非需要执行的函数为`undefined`或者`()=>{}`。

所以接下来理解`catch`就是很简单的事情，当`Promise`状态为`rejected`时，这个时候只会执行第二个参数，所以第一个参数可以被忽略掉，这个时候就出现了`catch`（`then`的语法糖）。

**注意：**并不是一个`Promise`对象状态完成后，只会执行`then`或者`catch`的其中一个，两者都会执行，虽然其中参数函数并不会调用，但是会占用微任务队列。
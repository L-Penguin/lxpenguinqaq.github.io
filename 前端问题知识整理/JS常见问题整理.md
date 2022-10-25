## JS常见问题整理

### 数据类型分类（基本和引用）


> - 基本类型：`null`、`undefined`、`boolean`、`number`、`string`、`symbol`
> - 引用类型`Object`：`Array`、`Function`、`Date`、`RegExp`、`Map(WeakMap)`、> `Set(WeakSet)`、（基本包装类型：`Boolean`、`Number`、`String`）；

`WeakMap`和`WeakSet`表示 弱映射 和 弱集合，与实际的映射`Map`和集合`Set`相比，当其中设置的属性或者值被赋值为null的时候，弱映射 和 弱集合的会被回收机制进行回收。

#### 存放位置

- 基本数据类型：基本数据类型在内存中占据固定大小，直接存储在**栈内存**中的数据；
- 引用数据类型：引用数据在栈中存储指针，这个指针指向堆内存中的地址，真实的数据存放在**堆内存**中。

#### 类型查看方式

- `typeof`：基本类型都能显示正确的类型（除了`null`，因为其在内存中二进制存储为全0，而类型区分就是以存储前3位区分，全0为对象），应用类型都会显示为`object`。
  000：对象；001：整型；010：双精度类型；011：字符串；110：布尔类型。

  ```javascript
  typeof undefined	// "undefined"
  typeof null	// "object"
  ```

- `instanceof`：用来判断一个对象是否在其原型链原型构造函数的属性。

  ```javascript
  1 instanceof Number	// false
  [1, 2, 3] instanceof Array	// true
  ```

  可以看出`instanceof`不能判断基本类型，但是可以判断引用类型。

- `constructor`：为原型对象上的属性，指向构造函数。

  ```javascript
  Array.prototype.constructor === Array	// true
  [1, 2, 3].constructor === Array	// true
  "123".constructor === String	// true 隐式转换为对象
  ```

  `undefined`和`null`没有`constructor`属性。

- `Object.prototype.toString.call()`：首先取得对象的一个内部属性[[class]]，然后依据这个属性。返回一个类似于"[object Array]"的字符串作为结果。（[[]]用来表示语言内部用到的，外部不可直接访问，被称为"内部属性"）

  ```javascript
  Object.prototype.toString.call(1);	// "[object Number]"
  Object.prototype.toString.call([1,2,3]);	// "[object Array]"
  ```

##### typeof和instanceof原理

> `typeof`会查看变量的机器码的1-3位。`null`为全0；`undefined`用-2^30整数表示。
>
> `instanceof`会查看 右边变量的`prototype`是否在左边变量的原型链上。



### this指向问题

> 区分情况分为**全局上下文**、**函数上下文**

#### 全局上下文

非严格模式和严格模式中`this`都是指向顶层对象。（浏览器中是`window`）

```javascript
this === window;	// true
'use strict'
this === window;	// true
```

#### 函数上下文

##### 普通函数调用模式

> `var`定义的变量或函数会绑定在顶层对象中（浏览器是`window`）添加属性；`let`和`const`定义的变量或函数不会绑定。
>
> `use strict`严格模式中，普通函数中的`this`为`undefined`，非严格模式下，普通函数中的`this`为顶层对象（浏览器是`window`）

```javascript
// 非严格模式
var name_1 = 'window1';
var func_1 = function() {
    console.log(this === window);	// true
    console.log(this.name_1);	// "window1"
}

let name_2 = 'window2';
let func_2 = function() {
    console.log(this === window);	// true
    console.log(this.name_2);	// "window2"
}
```

```javascript
// 严格模式
'use strict'
var name = 'window';
var func = function() {
    console.log(this === window);	// false
    console.log(this.name);	// undefined
}
```

##### 对象中函数调用模式

> 如果以`对象.方法`的方式调用函数，则该函数中的`this`为该对象；
>
> 如果把对象中的函数赋值为变量。这样就是普通函数，使用普通函数规则（默认绑定）。

```javascript
var name = 'window';
var func = function() {
    console.log(this.name);
}

var obj = {
    name: 'obj',
    func: func,
    other: {
        name: 'other',
        func: func
    }
}
obj.func();	// 'window'
obj.other.func();	// 'other'

var func_1 = obj.func;
func_1();	// 'window'
```

`call、apply、bind`调用模式

> 假如传递的`thisArg`为`undefined`或`null`，则函数中的`this`会指向顶层对象（浏览器为window），非严格模式下，传递为基本数据类型会被自动包装成对象，严格模式下不会；
>
> 语法：
>
> - `fn.call(thisArg, arg1, arg2, ...)`：其中`thisArg`会替换该函数中的`this`，后面的参数会传递到`fn`函数中执行，返回`fn`的返回值；
> - `fn.apply(thisArg, argArr)`：同call，传递到`fn`函数的参数是一个数组`argArr`（必须），相当于`fn(...argArr)`，返回`fn`的返回值；
> - `fn.bind(thisArg, arg1, arg2, ...)`：同call，返回修改`this`后的`fn`函数。

##### 构造函数调用模式

> 使用`new`操作符调用函数，会自动执行以下步骤：
>
> 1. 创建一个新的对象
> 2. 从参数中取出第一个，这个参数就是调用时的构造函数
> 3. 这个对象会执行[[Prototype]]，绑定原型对象，`obj.__proto__ = Obj.prototype`
> 4. 生成新对象会通过`apply`绑定到构造函数的`this`；
> 5. 判断构造函数是否有返回值：返回对象或函数，则返回构造函数返回值，否则返回新创建的对象。

也就是，当调用`new`操作符时，`this`指向生成的新对象。

##### 原型链中的调用模式 

> 相当于对象上的函数调用模式。所以只想生成的新对象。

```javascript
function Student(name){
    this.name = name;
}
var s1 = new Student('tom');
Student.prototype.doSth = function(){
    console.log(this.name);
}
s1.doSth(); // 'tom'
```

##### 箭头函数调用模式

> 箭头函数和普通函数的区别：
>
> 1. 没有自己的`this`、`super`、`arguments`和`new.target`绑定；
> 2. 不能使用`new`来调用；
> 3. 没有原型对象；
> 4. 不可以改变`this`的绑定；
> 5. 形参名称不能重复

箭头函数中没有`this`绑定，必须通过查找作用域链来决定其值。箭头函数的`this`指向在定义的时候继承自外部第一个普通函数的`this`。所以箭头函数中`this`的指向在它被定义的时候就已经确定了，之后永远不改变。

`call、apply、bind`无法改变箭头函数中的`this`指向。

##### DOM事件处理函数调用

> `onclicl`和`addEventListener`是指向绑定事件的元素。一些浏览器，比如`IE6~IE8`下使用`attachEvent`，`this`指向是`window`。

`event.currentTarget`和`event.target`的区别：`event.currentTarget`是绑定事件的元素，而`event.target`是当前触发事件的元素。比如`ul`和`li`。


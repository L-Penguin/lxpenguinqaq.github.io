// 重点1: 没有执行resolve函数之前，then中的操作必须存入数组，待resolve执行后再进行；

// 重点2: 链式操作，resolvePromise函数，重点的是决定resolve函数中传入的参数value。

// 重点3: 使用异步的原因是为了避免影响到调用栈中的任务顺序，并使用setTimeout(()=>{}, 0)尽可能模拟实现微任务

function resolvePromise(promise_2, x, resolve, reject) {
    if (x === promise_2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    let called;
    // x为对象或函数（构造函数）时可能为MyPromise对象
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            // 如果then为函数，默认为是promise对象
            if (typeof then === 'function') {
                then.call(x, y=> {
                    if (called) return;
                    called = true;
                    resolvePromise(promise_2, y, resolve, reject);
                }, err=> {
                    if (called) return;
                    called = true;
                    reject(err);
                })
            } else {
                resolve(x);
            }
        } catch (err) {
            if (called) return;
            called = true;
            reject(err);
        }
    } else {
        resolve(x);
    }
}

class MyPromise {
    constructor(execFunc) {
        this.state = "pending";
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        this.value;
        this.reason;

        let resolve = (value)=> {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                this.resolvedCallbacks.forEach(func=> func());
            }
        }
        let reject = (reason)=> {
            if (this.state === "pending") {
                this.state = "rejected";
                this.reason = reason;
                this.rejectedCallbacks.forEach(func=> func());
            }
        }

        try {
            execFunc(resolve, reject);
        } catch(err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value=> value;
        onRejected = typeof onRejected === "function" ? onRejected : err=> {throw err};

        let promise_2 = new MyPromise((resolve, reject)=> {
            console.log(this);
            if (this.state === "fulfilled") {
                setTimeout(()=> {
                    try {
                        let  x = onFulfilled(this.value);
                        resolvePromise(promise_2, x, resolve, reject);
                    } catch(err) {
                        reject(err);
                    }
                }, 0)
            };
            if (this.state === "rejected") {
                setTimeout(()=> {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise_2, x, resolve, reject);
                    } catch(err) {
                        reject(err);
                    }
                })
            }
            if (this.state === "pending") {
                this.onResolvedCallbacks.push(()=> {
                    setTimeout(()=> {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise_2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(()=> {
                    setTimeout(()=> {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise_2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
            };
        });
        return promise_2;
    }
    catch(func) {
            return this.then(null, func);
    }
}

//resolve方法
MyPromise.resolve = function(val){
    return new MyPromise((resolve, reject)=>{
        resolve(val)
    });
}
  //reject方法
MyPromise.reject = function(val){
    return new MyPromise((resolve, reject)=>{
        reject(val);
    });
}
  //race方法 
MyPromise.race = function(promises){
    return new MyPromise((resolve, reject)=>{
        for(let i=0; i<promises.length; i++) {
            promises[i].then(resolve, reject);
        };
    })
}
  //all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
MyPromise.all = function(promises){
    let arr = [];
    let i = 0;
    function processData(index, data) {
        arr[index] = data;
        i++;
        if(i == promises.length) {
            resolve(arr);
        };
    };
    return new MyPromise((resolve, reject)=> {
        for(let i=0; i<promises.length; i++) {
            promises[i].then(data=> {
                processData(i, data);
            }, reject);
        };
    });
}

MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {}
    dfd.promise = new MyPromise((resolve, reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
}
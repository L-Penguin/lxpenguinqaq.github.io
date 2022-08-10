function myInterval(func, timeout) {
    let timer = null;
    function inside() {
        func();
        timer = setTimeout(inside, timeout);
    }
    setTimeout(inside, timeout);
    return {
        // 清除定时器函数
        cancel: ()=> {
            clearTimeout(timer)
        }
    }
}

let control = myInterval(sayHello, 1000);

function sayHello() {
    console.log("hello!");
}
// 防抖
function debounce(func, delay=300) {
    let timer;
    return function() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(()=> {
            func.apply(this, arguments);
        }, delay);
    };
}

// debounce在绑定的时候执行一次，函数内的this为监听的DOM元素，arguments[0]默认为监听事件events。
window.addEventListener("scroll", debounce(function() {
    console.log("防抖滚动");
    console.log("this:", this, "args:", arguments);
}, 1000));

// 节流
function throttle(func, delay) {
    let flag = true;
    return function() {
        if (!flag) return;
        flag = false;
        timer = setTimeout(()=> {
            // 
            func.apply(this, arguments);
            flag = true;
        }, delay);
    };
}

window.addEventListener("scroll", throttle(function() {
    console.log("节流滚动");
    console.log("this:", this, "args:", arguments[0]);
}, 1000))
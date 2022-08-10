// 需求，设置定时器，每一秒执行一次
// 累加器
function counter() {
    let second = 0;
    
    function doCounter() {
        // 到达十秒后停止
        if (second === 10) {
            clearInterval(recordSecond);
            console.log("计时结束！");
            return;
        }
        second += 1;
        console.log(`${second}秒`);
    }
    return doCounter;
}

// 得到累加器
const doCounterFn = counter();
const recordSecond = setInterval(function() {
    // 调用累加器
    doCounterFn();
}, 1000);
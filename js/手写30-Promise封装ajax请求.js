function queryData(url) {
    let p = new Promise((res, rej)=> {
        let xhr = new XMLHttpRequest();
        xhr.open('post', url);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify({a: 123, b: "123456"}));
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            // 当请求成功时，用resolve进行回调
            if (xhr.readyState == 4 && xhr.status === 200) {
                res(xhr.responseText);
            } else {
                // 请求失败，用reject进行回调
                rej("服务器错误");
            }
        }
    });
    return p;   // 返回Promise对象
}

queryData("http://127.0.0.1:7001/postRes").then(res=> {
    console.log(res);
})
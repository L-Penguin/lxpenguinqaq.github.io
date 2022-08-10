/**
 * AJAX的核心是XMLHttpRequest
 * 一个完整的AJAX请求一般包括以下步骤
 * 1、实例化XMLHttpRequest
 * 2、连接服务器
 * 3、发送请求
 * 4、接受响应数据
 */

// 1、创建对象
const xhr = new XMLHttpRequest();
// 2、初始化对象
xhr.open('POST', 'http://localhost:7001/getRes');
//设置发送数据的请求格式
xhr.setRequestHeader('content-type', 'application/json');
// 3、发送
xhr.send(JSON.stringify({name: "小明"}));
// 4、绑定事件，处理响应结果 response
xhr.onreadystatechange = function() {
    // 判断 readyState = 4 证明进入了最后一个阶段
    if (xhr.readyState === 4) {
        // 判断响应状态码 [200, 300) 为成功返回的状态码
        if (xhr.status >= 200 && xhr.status < 300) {
            // 如果成功 打印出请求的数据
            console.log(xhr.responseText);
        } else {
            // 如果失败 打印出失败响应的状态码
            console.log(xhr.status);
        }
    }
}
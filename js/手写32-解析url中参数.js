let url = 'http://sample.com/?a=1&b=2&c=xx&d=2#hash';

// 方法1
const getUrlParams_1 = (url)=> {
    const arrSearch = url.split("?").pop().split("#").shift().split("&");
    let obj = {};
    arrSearch.forEach((item)=> {
        const [key, value] = item.split("=");
        obj[key] = value;
    });

    return obj
}

// 方法2
const getUrlParams_2 = (url)=> {
    let u = new URL(url);
    
    let s = new URLSearchParams(u.search.slice(1));
    console.log(s);
    let obj = {};
    s.forEach((val, key)=> {
        obj[key] = val;
    })
}

// 方法3
const getUrlParams_3 = ()=> {
    function parse(url) {
        let obj = {};
        url.replace(/([^?&=]+)=([^&]+)/g, (_, key, val)=> {
            obj[key] = val;
        });
    }
    url = url.split("#").shift();
    return parse(url);
}

// 测试
console.log(getUrlParams_1(url));   // {a: '1', b: '2', c: 'xx', d: '2'}
console.log(getUrlParams_2(url));   // undefined
console.log(getUrlParams_3(url));   // undefined

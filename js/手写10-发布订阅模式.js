class EventEmitter {
    constructor() {
        this.events = {};
    }
    // 实现订阅
    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback];
        } else {
            this.events[type].push(callback);
        }
    }
    // 删除订阅
    off(type, callback) {
        if (!this.events[type]) return false;
        this.events[type] = this.events[type].filter((item)=> item !== callback);
    }
    // 只执行一次订阅事件
    once(type, callback) {
        // 执行后取消订阅
        function fn() {
            callback();
            this.off(type, fn)
        }
        this.on(type, fn);
    }
    // 触发事件
    emit(type, ...args) {
        this.events[type] && this.events[type].forEach(fn=> fn.apply(this, args));
    }
}

let obj = new EventEmitter();
function sayHello(name) {
    console.log("Hello", name)
}
obj.on("sayHello", sayHello);

obj.emit("sayHello", "小明");
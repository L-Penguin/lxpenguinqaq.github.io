function Parent(name) {
    this.name = name;
    this.say = ()=> {
        console.log(this.name);
    }
}

Parent.prototype.play = function() {
    console.log(this.name);
}

function Children(name) {
    Parent.call(this);
    this.name = name;
}

// 重点
Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;

let child = new Children("小明");
child.say();
child.play();
function compose(...func) {
    if (!func.length) return v=> v;
    if (func.length === 1) return func[0];
    return func.reduce((pre, cur)=> (...args)=> cur(pre(...args)));
}

function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x * 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x * 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1));  // ((1*4)+3)*2+1 = 28

// 行为j，列为i
const arr = [
    [0, 0, 0, 0], 
    [4, 0, 0, 0],
    [0, 5, 0, 0],
    [1, 3, 2, 0]
]

let n = arr.length;
let ans = 0;

const vis = new Array(2*n).fill(true);

function dfs(a, b) {
    if (a == n) {
        ans = Math.max(ans, b);
        return;
    }
    for (var i=2; i<=2*n-1; i++) {
        if (!vis[i]) break;
    }
    for (let j=i+1; j<=2*n; j++) {
        if (!vis[j]) {
            vis[i] = true, vis[j] = true;
            dfs(a+1, Math.pow(b, arr[i-1][j-1]));
            vis[i] = false, vis[j] = false;
        }
    }
}

// 
for (let i=2; i<=2*n; i++) {
    vis[i] = true;
    dfs(1, arr[1][i]);
    vis[i] = false;
}

console.log(ans);
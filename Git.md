### Git使用指令

git clone -b <branchName> <gitPath>

#### 创建本地分支并推送到远程

> 在当前分支下创建本地分支：`git branch <branchName>`或者`git checkout -b <branchName>`；
>
> 将本地分支推送到远程：`git push origin <branchName>`；
>
> 将本地分支关联到远程分支：`git branch --set-upstream-to=origin/<branchName>`；

#### 删除本地分支和远程分支

> 删除本地分支：`git branch -d <branchName>`；
>
> 删除远程分支：`git push origin --delete <branchName>`

#### 合并远程分支

> 1. 创建一个本地分支，并将远程分支放入：`git checkout -b <branchName> <remoteBranch>`
> 2. 将远程代码pull到本地：`git pull origin <branchName>`
> 3. 返回需要合并到的分支：`git checkout master`
> 4. 合并分支到master：`git merge <branchName>`
> 5. 将本地分支同步到远程：`git push origin master`

-b
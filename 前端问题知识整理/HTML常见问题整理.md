## HTML常见问题整理

### html5部分

#### html语义化

> 根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和更好代码书写的同时**让浏览器的爬虫和机器更好的解析**。

优点：

- 没有css的情况下，页面也能呈现很好的内容结构和代码结构；
- 提高用户体验：例如`title`、`alt`用于解释名词和解释图片信息；
- 有利于SEO：和搜索引擎良好沟通，有助于爬虫爬取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
- 方便其他设备解析：例如屏幕阅读器以意义的方式来渲染网页；
- 便于团队开发和维护：语义化更具有可读性，可以减少差异化。

#### html5新标签

> 结构标签：`<header>`，`<nav>`、`<section>`、`<article>`、`<aside>`、`<figure>`、`<hgroup>`、`<footer>`
>
> 表单标签（针对input的type）：`search`、`email`、`url`、`number`、`range`、`color`、`date`
>
> 媒体标签：`<video>`、`<audio>`、`<embed>`
>
> 其他功能标签：`<progress>`、`<datalist>`、`<detail>`、`<mark>`、`<time>`、`<canvas>`、`<ruby>`、`<command>`



### script标签中的属性：defer、async

> `charset`----规定在脚本中使用的字符编码(仅适用于外部脚本)
>
> `src`----规定外部脚本的URL
>
> `type`----规定脚本的MIME类型
>
> `defe`----延迟加载脚本，页面加载之后才会运行脚本
>
> `async`----异步执行脚本，一旦脚本可用，则会异步运行

**defer和async的区别**

由于当html解析到script标签时就会发生阻塞（只解析js脚本）

defer和async都用于外部脚本下载，区别在于async异步下载完成后会立即执行，即阻塞html解析，而defer下载完成后不会立即执行，而是等待页面内解析完成后执行。

- async适合于第三方脚本，不需要操作DOM
- defer适合于需要操作DOM的js脚本



### href和src的区别

> src的特性：
>
> 1. 引用外部资源：比如`script`元素、`img`元素、`video`元素；
> 2. 会替换元素本身的内容：导入文档的内容会嵌入到当前元素中，导致原本的内容被替换掉；
> 3. 会暂停其他资源的下载：当浏览器解析到使用src的元素时，会暂停其他资源的下载，直到src引用资源加载、编译、执行完毕。这也是为什么script元素推荐放到html结构的底部。
>
> href的特性：
>
> 1. 表示超链接：比如`a`标签、`link`标签，表示外部资源与该页面的联系；
> 2. 不会替换元素本身的内容；
> 3. 不会暂停其他资源的下载：像css那样影响页面观感的可以放在html结构的头部优先加载。

核心思想的不同：

- src代表的是网站的一部分，没有会对网站的使用造成影响；
- href代表网站的附属资源，没有不会对网站的核心逻辑和结构造成影响。

为什么引用src使用href？

- 正如href代表的含义一样，CSS属于网站的附属资源，不影响网站核心逻辑和结构；
- 也可以简单归结为历史遗留问题。



### css和js的导入

导入css

- 行内式：即在标签元素的style属性中设定CSS样式

  ```html
  <h2 style="color: white; background-color: blue;">This is a line of Text</h2>
  ```

- 嵌入式：使用style标签设置CSS

  ```html
  <style>
      h2 {
          color: white;
          background-color: blue;
      }
  </style>
  ```

- 链接式：使用link标签引入外部CSS文件

  ```html
  <link rel="stylesheet" type="text/css" href="style.css">
  ```

- 导入式：使用CSS的规则引入外部CSS文件

  <style>
  	@import "style.css"
  	/* @import url("style.css") */
  </style>

导入js

- 外部引入：使用script标签中的src

  ```html
  <script type="text/javascript" src="path.js"></script>
  ```

- 内部引入：使用script标签

  ```html
  <script type="text/javascript">
  	coding
  </script>
  ```

- 行内引入：在标签中使用js代码

  ```html
  <input type="button" value="行内引入" onclick="javascript:alert(123)">
  ```



### 少见html属性

1. Multiple

   > `multiple` 属性是一个布尔值，允许用户在 `<input>` 标签操作，`<input>` 标签的类型 `type` 是 `file` 或者 `email`。当然，你也可以用在 `<select>` 标签。
   >
   > 对于 `email` 类型的 `<input>`，添加上 `multiple` 属性，你输入的邮箱值需要用 `,` 分隔开，内容不允许有空格。
   >
   > 对于 `file` 类型的 `<input>`，你可以多选文件上传。

   ```html
   <input type="file" multiple />
   ```

2. Accept

   > `<input>` 元素有 `accept` 属性，它允许你指明上传文件 `file` 的类型。
   >
   > 你需要通过 `,` 来分割文件类型。

   ```html
   <input type="file" accept=".png, .jpg" />
   ```

3. Contenteditable

   > `contenteditable` 是一个全局的属性（对于所有的 HTML 元素都适用），它可以使得 `HTML` 的可被用户编辑。
   >
   > **需要注意的是，它仅对可见内容和DOM的内容进行更改。**

   ```html
   <div contenteditable="true">I'm a cool editable div ;)</div>
   ```

   > 当然，如果你想使得整个文档的内容都可以编辑，你可以直接使用 `document.designMode = "on"`，关闭编辑则使用 `document.designMode = "off"`。如果你想保存整个文档或者某个编辑内容，可以直接通过 DOM 操作完成。

4. Spellcheck

   > `spellcheck` 也是一个全局的属性，可以检验 `HTML` 内容是否有拼写的语法错误，你可以用在 `input` 或其他元素上。
   >
   > 注意：通常不检查不可编辑元素的拼写错误，即使 `spellcheck` 被设置为 `true` 并且浏览器支持检查。

   ```html
   <!-- 不检查 -->
   <p spellcheck="true">
   Thanks furr checkinng my speling :)</p>
   
   <!-- 检查 -->
   <p contenteditable="true" spellcheck="true">
   Thanks furr checkinng my speling :)</p>
   ```

5. Translate

   > `translate`告诉浏览器制定的内容是否应该被翻译。

   ```html
   <footer><p translate="no">LearnPine</p></footer>
   ```

6. Poster

   > 当视频正在加载中或者当用户开始播放视频前，我们可以用 `poster` 属性设定指定的视频海报。
   >
   > 如果 `poster` 未指定图片，则视频的第一帧可用之后作为海报显示。

   ```html
   <video controls 
   src="https://bit.ly/3nWh78w"
   poster="posterImage.png">
   </video>
   ```

7. Download

   > `Download`属性结合`<a>`元素，告诉浏览器下载的`URL`，而不是到导航到它，提示用户将其下载到本地。还可以命名文件。

   ```html
   <a href="index.html" download="fileName">Download me :)</a>
   ```

   `url`指向video，image资源，不会直接下载，会进行跳转。


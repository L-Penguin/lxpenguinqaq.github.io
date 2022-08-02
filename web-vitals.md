## Web-Vitals

### 1、优化LCP

> Largest Contentful Paint（LCP）最大内容绘制
>
> 用于测量可视区域中最大内容元素变为可见的时间点。该项指标可用于确定页面主要内容在屏幕上完成渲染的时间点。

导致LCP不佳的最常见原因是：

- 服务器响应速度
- 阻塞渲染的JavaScript和css
- 资源加载速度
- 客户端渲染

#### 服务器响应速度

> 改进服务器处理内容的方式和位置。可以使用[**Time to First Byte 首字节时间**](https://web.dev/ttfb/) (TTFB) 测量服务器响应时间。

改进TTFB：

- 优化服务器
- 将用户路由到附近的CDN
- 缓存资产
- 优化使用缓存提供HTML页面
- 尽早建立第三方连接
- 使用签名交换

##### 优化服务器

> 是否有需要消耗大量时间和系统资源的查询操作？或是否有延迟页面内容返回的操作？分析代码并提高效率。
>
> 许多服务端网络框架并不会在浏览器请求时立即提供静态页面，而是动态创建网络页面。在服务器上运行的许多网络框架都有性能指导，可以利用这些指导优化服务器。

##### 将用户路由到附近的CDN

> 内容分发网络（CDN）是分布在许多不同位置的服务器网络。如果将网页内容托管在单个服务器上，那么对于地理位置较远的用户来说，网站加载速度就会变慢，所以可以考虑使用CDN来确保用户不必为发送到远距离服务器的网络请求而等待。

##### 缓存资产

> 如果HTML是静态的，且不需要针对每个请求进行更改，那么缓存可以防止网页进行不必要的重建。通过在磁盘上存储医生称的HTML副本，服务端缓存可以减少TTFB并最大限度地减少资源使用。

根据使用的工具链，可以使用不同的方法进行服务器缓存：

- 配置反向代理（[Varnish](https://varnish-cache.org/)、[nginx](https://www.nginx.com/)）来提供缓存内容，或者当安装在应用程序服务器之前时充当缓存服务器
- 配置和管理云服务提供商（[Firebase](https://firebase.google.com/docs/hosting/manage-cache)、[AWS](https://aws.amazon.com/caching/)、[Azure](https://docs.microsoft.com/en-us/azure/architecture/best-practices/caching)）的缓存方式
- 使用提供边缘服务器的CDN，以便将内容进行缓存并存储在离用户更近的地方

##### 优先使用缓存提供HTML页面

> 安装好的 [Service Worker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API) 会在浏览器后台运行，并可以拦截来自服务器的请求。此级别的程序化缓存控制使得缓存部分或全部 HTML 页面内容得以实现，并且只会在内容发生更改时更新缓存。

##### 尽早建立第三方连接

> 对第三方域的服务器请求也会影响 LCP，尤其是当浏览器需要这些请求来在页面上显示关键内容的情况下。使用`rel="preconnect"`来告知浏览器您的页面打算尽快建立连接。
>
> ```html
> <link rel="preconnect" href="https://example.com" />
> ```
>
> 还可以使用`dns-prefetch`来更快地完成DNS查找。
>
> ```html
> <link rel="dns-prefetch" href="https://example.com" />
> ```
>
> 尽管两种提示的原理不同，但对于不支持`preconnect`的浏览器，可以考虑将`dns-prefetch`做为后备。

##### 使用签名交换（SXG）

> [签名交换 (SXG)](https://web.dev/signed-exchanges) 是一种交付机制，通过提供采用了易于缓存格式的内容来实现更快的用户体验。具体来说， [Google 搜索](https://developers.google.com/search/docs/advanced/experience/signed-exchange)会缓存 SXG，有时也会预获取 SXG。对于通过 Google 搜索获得大部分流量的网站，SXG 可以是改进 LCP 的重要工具。如需了解更多信息，请参阅[签名交换](https://web.dev/signed-exchanges)。



#### 阻塞渲染的JavaScript和CSS

> 浏览器在能够渲染任何内容之前，需要将 HTML 标记解析为 DOM 树。如果 HTML 解析器遇到任何外部样式表（`<link rel="stylesheet">`）或同步 JavaScript 标签（`<script src="main.js">`），则会暂停解析。

##### 减少CSS阻塞时间

> 通过以下操作确保网站上只有少量的必要CSS会阻塞渲染：
>
> - 削减CSS
> - 延迟加载非关键CSS
> - 内联关键CSS

###### 削减CSS

> 为了更加易于阅读，CSS 文件可以包含空格、缩进或注释等字符。这些字符对于浏览器来说都不是必要的，而对这些文件进行削减能够确保将这些字符删除。最终，在减少了阻塞渲染的 CSS 数量后，充分渲染页面主要内容所需的时间 (LCP) 也总是能够相应地缩短。
>
> 如果您使用模块打包器或构建工具，那么可以在其中包含一个相应的插件来在每次构建时削减 CSS 文件：
>
> - 对于 webpack：[optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
> - 对于 Gulp：[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
> - 对于 Rollup：[rollup-plugin-css-porter](https://www.npmjs.com/package/rollup-plugin-css-porter)

###### 延迟加载非关键CSS

> 使用 Chrome 开发者工具中的[代码覆盖率](https://developer.chrome.com/docs/devtools/coverage/)选项卡查找您网页上任何未使用的 CSS。
>
> 优化方式：
>
> - 如果是在您网站的单独页面上使用，可以将所有未使用的 CSS 完全删除或移动到另一个样式表。
>
> - 对于任何初始渲染时不需要的 CSS，请使用 [loadCSS](https://github.com/filamentgroup/loadCSS/blob/master/README.md) 来异步加载文件，这里运用了`rel="preload"`和`onload`。
>
>   ```html
>   <link rel="preload" href="stylesheet.css" as="style" onload="this.rel='stylesheet'">
>   ```

###### 内联关键CSS

> 通过把用于首屏内容的任何关键路径CSS直接包括在`<head>`中将这些CSS进行内联。
>
> 将重要样式进行内联后，就不再需要通过往返请求来获取关键 CSS。延迟加载其余部分可以最大限度地减少 CSS 阻塞时间。
>
> 如果您无法为您的网站手动添加内联样式，请使用库来将该过程自动化。一些示例：
>
> - [Critical](https://github.com/addyosmani/critical)、[CriticalCSS](https://github.com/filamentgroup/criticalCSS) 和 [Penthouse](https://github.com/pocketjoso/penthouse) 都是提取和内联首屏 CSS 的包
> - [Critters](https://github.com/GoogleChromeLabs/critters) 是一个 webpack 插件，能够内联关键 CSS 并对其余部分进行懒加载

###### 减少JavaScript阻塞时间

> 下载并向用户提供尽可能少的必要 JavaScript。减少阻塞渲染的 JavaScript 数量能够让渲染速度更快，从而获得更好的 LCP。
>
> 这可以通过优化您的脚本来实现，有如下几种不同的方式：
>
> - [削减和压缩 JavaScript 文件](https://web.dev/reduce-network-payloads-using-text-compression/)
> - [延迟加载未使用的 JavaScript](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
> - [最大限度减少未使用的 polyfill](https://web.dev/serve-modern-code-to-modern-browsers/)



#### 资源加载速度

> 虽然 CSS 或 JavaScript 阻塞时间的增加会直接导致性能下降，但加载许多其他类型资源所需的时间也会影响绘制时间。影响 LCP 的元素类型为：
>
> - `<img>`元素
> - 内嵌在`<svg>`元素内的`<image>`元素
> - `<video>`元素（使用[封面](https://developer.mozilla.org/docs/Web/HTML/Element/video#attr-poster)图像测量 LCP）
> - 通过[`url()`](https://developer.mozilla.org/docs/Web/CSS/url())函数（而非使用 CSS 渐变）加载的带有背景图像的元素
> - 包含文本节点或其他行内级文本元素的[块级](https://developer.mozilla.org/docs/Web/HTML/Block-level_elements)元素
>
> 如果在首屏渲染，加载这些元素所需的时间将对 LCP 产生直接影响。有几种方法可以确保尽快加载这些文件：
>
> - 优化和压缩图像
> - 预加载重要资源
> - 压缩文本文件
> - 基于网络连接交付不同资产（自适应服务）
> - 使用 Service Worker 缓存资产

##### 优化和压缩图像

> 改善这些类型的图像进行加载和渲染所需的时间将直接提升 LCP 的速度。实现方式：
>
> - 首先考虑不使用图像。如果图像与内容无关，请将其删除。
> - 压缩图像（例如使用 [Imagemin](https://web.dev/use-imagemin-to-compress-images)）
> - 将图像转换为更新的格式（JPEG 2000、JPEG XR 或 WebP）
> - 使用响应式图像
> - 考虑使用图像 CDN

##### 预加载重要资源

>  如果知道某个特定资源应该被优先获取，请使用``来更加及时地获取该资源。 [多种类型的资源](https://developer.mozilla.org/docs/Web/HTML/Preloading_content#What_types_of_content_can_be_preloaded)都可以进行预加载，但您应该首先侧重于[预加载关键资产](https://web.dev/preload-critical-assets/)，例如字体、首屏图像或视频，以及关键路径 CSS 或 JavaScript。
>
> ```html
> <link rel="preload" as="script" href="script.js" />
> <link rel="preload" as="style" href="style.css" />
> <link rel="preload" as="image" href="img.png" />
> <link rel="preload" as="video" href="vid.webm" type="video/webm" />
> <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />
> ```
>
> 从 Chrome 73 开始，预加载可以与[响应式图像](https://web.dev/preload-responsive-images/)一起使用，将两种模式相结合能够实现更快速的图像加载。
>
> ```html
> <link
>   rel="preload"
>   as="image"
>   href="wolf.jpg"
>   imagesrcset="wolf_400px.jpg 400w, wolf_800px.jpg 800w, wolf_1600px.jpg 1600w"
>   imagesizes="50vw"
> />
> ```

##### 压缩文本文件

> 压缩诸如 [Gzip](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s) 和 [Brotli](https://opensource.googleblog.com/2015/09/introducing-brotli-new-compression.html) 之类的算法可以显著缩减在服务器和浏览器之间传输的文本文件（HTML、CSS、JavaScript）大小。所有浏览器都有效支持 Gzip，而 Brotli [几乎可以在所有较新的浏览器中使用](https://caniuse.com/#feat=brotli)，并能提供更好的压缩结果。
>
> 压缩您的资源将最大限度地减少这些资源的交付大小、缩短加载时间，从而改善 LCP。
>
> 1. 首先，检查您的服务器是否已经自动压缩文件。大多数托管平台、CDN 和反向代理服务器在默认情况下都会对资产进行压缩编码，或者使您能够轻松配置资产。
> 2. 如果您需要对服务器进行修改来使其压缩文件，请考虑使用 Brotli，而不是 gzip，因为 Brotli 可以提供更好的压缩率。
> 3. 选择您要使用的压缩算法后，请在构建过程中提前压缩资产，而不是在浏览器请求时实时压缩资产。这样能够最大限度地减少服务器开销并防止在发出请求时出现延迟，尤其是在使用高压缩比的情况下。

##### 自适应服务

> 当加载构成页面主要内容的资源时，根据用户的设备或网络条件按需获取不同的资源会是一个有效做法。您可以使用[网络状况 API](https://wicg.github.io/netinfo/)、[设备内存 API](https://www.w3.org/TR/device-memory/) 和[硬件并发 API](https://html.spec.whatwg.org/multipage/workers.html#navigator.hardwareconcurrency) 来实现这一做法。
>
> ```js
> if (navigator.connection && navigator.connection.effectiveType) {
>   if (navigator.connection.effectiveType === '4g') {
>     // 加载视频
>   } else {
>     // 加载图像
>   }
> }
> ```
>
> 可以使用一系列使用属性：
>
> - `navigator.connection.effectiveType`：有效连接类型
> - `navigator.connection.saveData`：启用/禁用数据保护程序
> - `navigator.hardwareConcurrency`：CPU 核心数
> - `navigator.deviceMemory`：设备内存

##### 使用 Service Worker 缓存资产

> Service Worker 可用于完成许多有用的任务，其中包括本文前面提到的提供较小的 HTML 响应。Service Worker 还可用于缓存任何静态资源，并在收到重复请求时将资源直接提供给浏览器，而无需通过网络。
>
> 使用 Service Worker 预缓存关键资源可以显著减少资源加载时间，特别是对于使用较弱连接重新加载网页（甚至离线访问）的用户。与自己编写自定义 Service Worker 来更新预缓存资产相比，诸如 [Workbox](https://developer.chrome.com/docs/workbox/) 这样的库可以使整个过程更加容易。



#### 客户端渲染

> 许多网站使用客户端 JavaScript 逻辑直接在浏览器中渲染页面。诸如 [React](https://reactjs.org/)、[Angular](https://angular.io/) 和 [Vue](https://vuejs.org/) 这类的框架和库使构建单页应用变得更加容易，这些单页应用完全在客户端（而不是在服务器）中处理网页的各个层面。
>
> 如果您正在搭建一个主要在客户端进行渲染的网站，那么应该小心网站在使用大型 JavaScript 包时可能对 LCP 产生的影响。如果没有通过优化来加以阻止，那么在所有关键 JavaScript 完成下载和执行前，用户可能都无法看到页面上的任何内容或与之交互。
>
> 在搭建客户端渲染的网站时，请考虑以下优化：
>
> - 最小化关键 JavaScript
> - 使用服务端渲染
> - 使用预渲染

##### 最小化关键JavaScript

> 如果网站的内容只有在一定数量的JavaScript完成下载后才变得可见或者可交互：尽可能缩减代码包的大小就很重要。可以通过以下方式实现：
>
> - 削减JavaScript
> - 延迟加载未使用的JavaScript
> - 最大限度减少未使用的polyfill

##### 使用服务端渲染

> 对于主要由客户端渲染的网站来说，首先需要关注的是将JavaScript的数量最小化。但是，也需要结合考虑服务端渲染来改善LCP。
>
> 这种概念的实现方式是使用服务器将应用渲染为HTML，然后客户端将所有JavaScript及所需数据"[水合](https://www.gatsbyjs.org/docs/react-hydration/)"到相同的DOM内容中。这个做法可以通过确保页面的主要内容首先在服务器上进行渲染（而不是仅在客户端上进行渲染）来改进LCP，但该做法有一些弊端：
>
> - 在服务器和客户端上维护相同的由 JavaScript 渲染的应用会增加复杂性。
> - 与只使用服务器提供静态页面相比，在服务器上执行 JavaScript 来渲染 HTML 文件总是会增加服务器响应时间 (首字节时间 TTFB)。
> - 服务端渲染的页面可能看似具备交互性，但在所有客户端 JavaScript 执行完毕之前，页面其实无法对任何用户输入作出响应。简而言之，该做法会使 [**Time to Interactive 可交互时间**](https://web.dev/tti/) (TTI) 变得更糟。】

##### 使用预渲染

> 预渲染是一种独立的技巧，该技巧比服务端渲染简单，并且还提供了一种改进应用程序 LCP 的方法。无头浏览器是一种没有用户界面的浏览器，我们会用无头浏览器在搭建期间生成每个路由的静态 HTML 文件。然后可以将这些文件与应用程序所需的 JavaScript 包一起进行运送。
>
> 在使用预渲染后，TTI 仍然会受到负面影响，但服务器响应时间不会像服务端渲染解决方案（仅在接到请求后才对各个页面进行动态渲染）中那样受到很大影响。



### 核心指标介绍

`Web Vitals` 是谷歌定义的一组度量指标，用于度量渲染时间(`render time`)、响应时间(`response time`)和布局偏移(`layout shift`)。每个数据点都提供了关于应用程序总体性能的见解。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/14/1734b62b384cb34c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 最大内容绘制（LCP Largest Contentful Paint）

##### 定义

> 测试最大内容出现在视口中的渲染时间。这可以是来自文档对象模型（`DOM`）的任何形式。它是视口中对打的像素区域，因此具有最直观的定义。`LCP`帮助开发人员了解用户看到网页上的主要内容需要多长。`LCP`指标代表的是视窗最大可见图片或者文本块的渲染时间。
>
> 旧指标，像`load`和`DOMContentLoaded`并不是很好。
>
> 当初始的 **HTML** 文档被完全加载和解析完成之后，**`DOMContentLoaded`** 事件被触发，而无需等待样式表、图像和子框架的完全加载。
>
> 当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发`load`事件。它与[`DOMContentLoaded`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event)不同，后者只要页面 DOM 加载完成就触发，无需等待依赖资源的加载。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba47728ead9a4975ba66b42194ddb312~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" alt="img" style="zoom: 25%;" />

##### 元素类型

根据目前定义，元素的类型包含如下几种：

- `<img>` 元素
- `<svg>` 中的 `<image>` 元素
- `<video>` 元素（如果定义了封面图，会影响LCP）
- 带 `url()` 背景图的元素
- 块级元素带有文本节点或者内联文本子元素

未来可能会加入更多元素。

##### 元素大小

LCP中元素大小的定义是用户视窗所见到的尺寸。如果元素在视窗外面，或者元素被overflow裁剪了，这些部分不计算入LCP的元素尺寸。

- 对于设置了大小的`img`元素，尺寸为设置`img`的大小。
- 对于文本元素，尺寸为包含所有文本的最小矩阵。
- 对于其他元素而言，css样式中的margin、padding和border都不算。

##### LCP的上报

由于Web页面是分阶段加载的，所以在加载过程中最大元素可能随时发生变化。

为捕获这种变化，浏览器会派发一个类型是`largest-contentful-paint`的`PerformanceEntry`对象，表示浏览器绘制第一帧的时候最大的元素。在后来的渲染中，如果最大元素发生变化，会再次派发一个`PerformanceEntry`对象。

只有元素已经渲染，而且对用户可见，这个元素才可以被当成最大元素。未加载的图片未被渲染，所以不会被考虑在内。如果用了自定义字体的文本，在字体文件加载之前，也不会被当成最大元素。

后来被JS添加到dom树上的节点，如果尺寸大于之前的最大元素，浏览器也会派发一个 `PerformanceEntry` 对象。

如果元素被移除，这个元素不会被当成最大元素。如果图片元素的src属性更改了，在新图片加载之前，这个元素也不会被当成最大元素。（Chrome 88之后进行更新，移除最大元素，会触发分化新的对象）

如果用户产生了交互行为（如点击、滚动、按键等），浏览器会停止上报新的entry，因为用户的交互行为可能会导致页面元素的可见性变化。

对于统计而言。只需要统计最近上报的一次`PerformanceEntry`。

##### 加载时间和渲染时间

因为安全的因素，如果跨域图片缺少 `Timing-Allow-Origin` 的header，图片渲染的时间无法拿到，相应的，可以用图片加载时间来替代。不过推荐还是尽可能的加上这个header。

##### 元素的布局和尺寸变化

为了使计算和怕发新的对象的性能消耗保持较低，元素的大小和位置的改变不会创建新的LCP对象（`PerformanceEntry`），只有元素在视窗内的初始大小和位置才会被考虑。

也就是说，最初在屏幕外完成渲染，然后过渡到屏幕上的图像可能不会得到报告。这也意味着最初在可视区域内进行渲染，然后被推出可视区域外的元素仍将报告其在可视区域内的初始大小。

##### 测量LCP

最简单的方式是使用`web-vitals`的js库：

```js
import {getLCP} from 'web-vitals';

// Measure and log the current LCP value,
// any time it's ready to be reported.
getLCP(console.log);
```

##### 如果最大元素并非主要内容

> 使用 [Element Timing API](https://link.juejin.cn/?target=https%3A%2F%2Fwicg.github.io%2Felement-timing%2F) 来设置自己的自定义指标。

##### 改善LCP

> LCP主要受以下四方面影响:
>
> - 较慢的服务器响应时间
> - 阻塞渲染的js或者css
> - 资源加载时间
> - 客户端渲染性能


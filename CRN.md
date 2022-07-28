## CRN相关记录

### 组件方面

#### APP

> 是一个基类。CRN app入口
>
> 每一个使用`AppRegistry.registerComponent`注册的组件都应该是一个App子类。该模块加载时会new出一个实例，这个实例称之为app。

```js
import { App } from '@ctrip/stark-ctrip/jarvis'

class HelloWorld extends App {}
AppRegistry.registerComponent('HelloWorld', () => HelloWord);
```

App作为一个入口组件主要提供了下面几个功能：

- 初始化页面和管理页面渲染
- 封装路由，管理路由配置
- 与Native交互，绑定Native暴露的变量与方法，这些变量和方法的作用域与生命周期都与app一致
- 处理侧滑返回，在Native侧滑返回（app首页）与RN侧滑返回（非app首页）之间无缝自由切换
- 集成RN原生导航栏，抹平平台差异。

页面配置信息：

```js
import page1 from './src/Page1.js';
import page2 from './src/Page2.js';

const pages = [
	{
	    component:page1,
	    name:'page1',
	    isInitialPage:true,
	},
	{
	    component:page2,
	    name:'page2',
	    animated:fasle, /**7.15支持配置当前Page是否支持切换动画 */
	}
];

const navigationBarConfig = {
	hide:true, // 默认为 false
	backgroundColor:'rgb(1, 100, 200)', // 导航栏背景色
};

class HelloWorld extends App {
	constructor(props) {
		super(props);
		this.init({pages, navigationBarConfig});
	}
}

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
```

- `pages`是一个数组（元素为对象），包含了当前app所有页面类配置信息，数组顺序并不是页面切换顺序；
- `component` 是一个`Page`类名，根据这个类名实例化具体页面对象；
- `name` 页面名，页面切换时需要用到；
- `isInitialPage` 指定 app 首页，也可以在 URL 中指定，优先级：URL > 配置指定 > pages 数组第一个元素。



#### Page

> Page对应每个页面。也是基类，需要继承使用；

```js
class Page1 extends Page {}
```

Page提供下面几个功能：

- 页面切换（push/pop/back/replace）
- PV自动埋点
- 页面生命周期自动管理

页面切换功能使用

```js
class Page1 extends Page {
    // 继承Page后，对象中的this就有push、pop、back、replace函数
    // 页面切换pop
    this.pop();
	this.pop(PageName);	// 返回到指定PageName页面。支持版本>=7.4
	/*
		如果需要传递数据到上一页面，建议使用上一页面push过来时传递的回	 调函数callBack函数，手动pop之前通过回调上一个页面传过来的		       callBack函数
	*/
	this.props.callBack(data);
	this.pop();

	// 页面替换replace
	this.replace(PageName, params);
	
	// 页面替换replaceAtIndex
	this.replace(PageName, index, cb, params);	// 使用PageName页面替换路由中index的页面。cb为回调函数。

	// 页面替换replacePrevious
	this.replacePrevious(PageName, params); // 使用PageName页面替换当前页面上。

	// PV自动埋点，按照产品统计标准，每次页面展示（包括从后一页面回退回来）都会记录一次PV。需要在Page子类中实现getPageId函数：
	getPageId() {
        return 'pageId';
        // return 'ignore_page_pv';	// 忽略框架PV埋点
    }

	// 需要在Page子类中实现。设置PV埋点带上orderid字段。其他扩展字段需要需要发送使用trace埋点。
	getPVOption() {
        return {
            'orderid: '123'
        }
    }
	
	// pushPage>=8.2 动态require Page，然后进行跳转。
	let page = {
        name: 'PageName',
        component: require('./PageName').default
    }
    this.pushPage(page, params)
}
```



#### ViewPort

> 可以理解为Web上的视图，页面展示的内容应该使用ViewPort抱起来：
>
> - 根据导航栏的隐藏与否自动调整页面大小
> - 优化页面切换卡顿问题
>
> ```js
> class Page1 extends Page {
>     render() {
>         return (
>             <ViewPort>
>                 <View style={styles.container}>
>                     <Text style={styles.welcome}>
>                         Welcome to Page1
>                     </Text>
>                     <Text style={styles.instructions}>
>                         Shake or press menu button for dev menu
>                     </Text>
>                 </View>
>             </ViewPort>
>         );
>     }
> ```



### 组件使用

- 弹窗`Toast`

  ```js
  import {Toast} from '@ctrip/crn'
  
  /*
  	text: string —— 显示的文本内容
  	duration: number —— 弹窗持续时间
  	callback: function —— 回调函数
  */
  Toast.show(text[, duration]);
  ```

- 弹窗`Alert`

  ```js
  import {Alert} from 'react-native'
  
  /*
  	title: string —— 弹窗的标题
  	content: string —— 弹窗的内容
  	Arr: array of buttons —— 用于布置按钮，例如:(style: 'default' || 'cancel' || 'destructive')
  	
  	[
          {
            text: "Ask me later",
            onPress: () => console.log("Ask me later pressed")
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
  */
  Alert.alert(title, content, Arr);
  /*
  	title: string —— 弹窗的标题
  	message: string —— 显示在文本输入上方的可选消息
  	callbackOrButtons: function|array of buttons —— 当用户点击"确定"时执行的回调函数; 传递一个数组，将按钮按数组内容进行配置。
  	type: string —— 配置文本输入; 'default'|'plain-text'|'secure-text'|'login-password'
  	defaultValue: string —— 文本输入中的默认文本
  	keyboardType: string —— 第一个文本字段的键盘类型
  */
  Alert.prompt(title[, message][, callbackOrButtons][, type][, defaultValue][, keyboardType])
  ```

  




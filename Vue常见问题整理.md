## Vue常见问题整理

### MVVM介绍

> MVVM是`Model-View-ViewModel`缩写，也就是将`MVC`中的`Controller`变成了`ViewModel`。`Model`层代表数据模型，`View`代表UI组件，`ViewModel`是`View`和`Model`层的桥梁，数据会绑定到`ViewModel`层并自动将数据渲染到页面中，视图变化的时候会通知ViewModel层更新数据



### Vue3的新组件

#### 1、Teleport

> `Teleport` 是一种能够将<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。
>
> 移动位置为css选择器

```html
<teleport to="移动位置">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

#### 2、Suspence

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好`default` 与 `fallback`

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

#### 3、Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用



### Vue2和Vue3的区别

> **vue2和vue3的区别有8点**：
>
> 1. 双向数据绑定原理不同；
> 2. 是否支持碎片；
> 3. API类型不同；
> 4. 定义数据变量和方法不同；
> 5. 生命周期钩子函数不同；
> 6. 父子传参不同；
> 7. 指令与插槽不同；
> 8. main.js文件不同

#### 1、双向数据绑定原理不同

**vue2**：vue2的双向数据绑定是利用 ES5 的API **`Object.defineProperty()`** 对数据进行劫持，结合发布订阅模式的方式来实现。

**vue3**：vue3中使用了 ES6 的API **`Proxy`**对数据代理。相比vue2，使用proxy的优势如下：

- defineProperty只能监听某个属性，不能对全对象监听；
- 可以省去`for in`，闭包等内容来提升效率（直接绑定整个对象即可）；
- 可以监听数组，不用再去单独对数组做特异性操作vue3可以检测到数组内部数据的变化。

#### 2、是否支持碎片

**vue2**：vue2**不支持**碎片。

**vue2**：vue3**支持碎片（Fragment）**，就是说可以拥有多个根节点。

#### 3、API类型不同

**vue2**：vue2使用**选项类型api**，选项类型api在代码里分割了不同的属性：`data`，`computed`，`methods`等。

**vue3**：vue3使用**合成型api**（组合式api），新的组合式api能让我们使用方法分割，相比于就的api使用属性来分组，这样代码会更加简便和整洁。

#### 4、定义数据变量和方法不同

**vue2**：vue2是把数据放入data中，在vue2中定义数据变量是`data() {}`，创建的方法要在`methods: {}`。

**vue3**：vue3就需要使用一个新的`setup()`方法，此方法在组件初始化构造的时候触发。使用一下三个步骤来建立响应式数据：

- 从vue引入**reactive**；
- 使用**reactive()**方法 来声明数据为响应式数据；
- 使用setup()方法来返回响应式数据，从而**template**可以获取这些响应性数据

#### 5、生命周期钩子函数不同

**vue2**：**vue2中的生命周期**

- beforeCreate 组件创建之前
- created 组件创建之后
- beforeMount 组件挂载到页面之前执行
- mounted 组件挂载到页面之后执行
- beforeUpdate 组件更新之后
- updated 组件更新之后
- beforeDestroy 组建销毁之前
- destroyed 组件销毁之后
- 路由组件中：activated 组件激活之后；deactivated 组件失活之后
- errorCaptured 当捕获一个

**vue3**：**vue3中的生命周期**

- setup 开始创建组件
- onBeforeMount 组件挂载到页面之前执行
- onMounted 组件挂载到页面之后执行
- onBeforeUpdate 组件更新之前
- onUpdated 组件更新之后
- onBeforeUnmount 组件卸载之前
- onUnmounted 组件卸载之后

**对比**（vue2 --> vue3）

- beforeCreate -> setup()
- created -> setup()
- beforeMount -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- 路由组件：activated -> onActivated；deactivated -> onDeactivated
- errorCaptured -> onErrorCaptured

而且vue3生命周期在调用前需要先进行引用。除了这些钩子函数外，vue3还增加了onRenderTracked 和 onRenderTriggered函数。

**onRenderTracked生命周期函数**：当页面渲染的时候，vue都会重新收集响应式的依赖，响应式的依赖一旦重新渲染需要重新收集的时候onRenderTracked便会自动执行一次。页面首次渲染便会执行，页面再次重新渲染也会执行，与onRenderTracked对应的函数是onRenderTriggered指每次重新渲染被触发的时候，首次页面加载不会触发，当数据改变，页面重新渲染的时候触发，onRenderTracked也会再次触发。

#### 6、父子传参不同

**vue2**：父传子，用props，子传父用事件Emitting Events。在vue2中，会调用**this.$emit**然后传入事件名和对象。

**vue3**：父传子，用props，子传父用事件Emitting Events。在vue3中的setup()中的第二个参数content对象中就有emit，那么只要在setup()接收**第二个参数中使用分解对象法取出emit**就可以在setup方法中使用。

#### 7、指令与插槽不同

**vue2**：vue2中使用slot可以**直接使用slot**；v-for与v-if在vue2中优先级高的是**v-for**指令，而且不建议一起使用。

**vue3**：vue3中必须使用**v-slot**的形式；vue3中v-for与v-if，只会把当前v-if当做v-for中的一个判断语句，**不会相互冲突**；vue3中移除keyCode作为v-on的修饰符，当然也不支持config.keyCodes；vue3中**移除v-on.native修饰符**；vue3中**移除过滤器filter**。

#### 8、main.js文件不同

**vue2**：vue2中可以使用**prototype(原型)**的形式去进行操作，引入的是**构造函数**。

**vue3**：vue3中需要使用**结构**的形式进行操作，引入的是**工厂函数**；vue3中app组件可以**没有根标签**。

<img src="D:\Users\q.li5\AppData\Roaming\Typora\typora-user-images\image-20221013151823556.png" alt="image-20221013151823556" style="zoom:75%;"/>

<img src="D:\Users\q.li5\AppData\Roaming\Typora\typora-user-images\image-20221013151823556.png" alt="image-20221013151823556" style="zoom:75%;" />

#### setup()函数特性

- setup()函数接收两个参数：props、context(包含attrs、slots、emit)。
- setup函数是出于生命周期beforeCreate和created两个钩子函数之前。
- 执行setup时，组建实例尚未被创建（在setup内部，this不会是该实例对象的引用，即不指向vue实例，Vue为了避免错误的使用，直接将setup函数中的this修改成了undefined）。
- 与模板一起使用时，需要返回一个对象。
- 因为setup函数中，props是响应式的，当传入新的props时，它将会被更新，所以不能使用es6结构解析，因为它会消除props的响应式，如需结构解析props，可以通过使用setup函数中的toRefs来完成此操作。
- 在setup()内使用响应式数据时，需要通过.value获取。
- 从setup()中返回的对象上的property返回并可以在模板中被访问到，它将自动展开为内部值。不需要在模板中追加.value（类似于`{{}}`这种形式）。
- setup函数只能是同步的，不能是异步的。



### 自定义指令directive

> 全局声明：`Vue.directive(指令名，配置对象|回调函数)`
>
> 局部声明：`new Vue({directives: {指令名: 配置对象|回调函数}})`
>
> 配置对象中的回调：
>
> - `.bind`：指令与元素成功绑定时调用
> - `.inserted`：指令所在元素被插入页面时调用
> - `.update`：指令所在模板结构被重新解析时调用。、
> - `.componentUpdated`：指令所在组建的VNode及其子VNode全部更新后调用。
> - `.unbind`：只调用一次，指令与元素解绑时调用。
>
> 回调函数接收的参数：
>
> - `el`：指令所绑定的元素，可以用来直接操作DOM。
> - `binging`：一个对象，里面包含几个属性
>   name：指令名，不包含v-前缀
>   value：指令的绑定至，例如：v-test="1 + 1"中，绑定值为2.
> - `vnode`：Vue编译生成的虚拟节点。
> - `oldVnode`：上一个虚拟节点，仅在update和componentUpdate钩子中可用。

**举例**

```vue
Vue.directive("fbind", {
    // 指令与元素成功绑定时
    bind(element, binding) {
    element.value = binding.value
    },
    // 指令所在元素被插入页面时
    inserted(element, binding) {
    element.focus()
    },
    // 指令所在模板被重新解析时
    update(element, binding) {
    element.value = binding.value 
    }
})
```



### vue2和vue3的响应式原理区别

#### **vue2**源码

```js
// 触发更新视图回调
function updateview() {
    console.log("试图更新");
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype;
// 创建新对象，原型指向oldArrayProperty，再扩展新的方法不会影响原数组原型
const arrproto = Object.create(oldArrayProperty);
["push", "pop", "shift", "unshift", "splice"].forEach(methodName => {
    arrProto[methodName] = function() {
        updateView();	// 触发视图更新
        oldArrayproperty[methodName].call(this, ...arguments);
    }
})

// 分解对象属性函数
function observer(target) {
	if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target;
    }
    
    if (Array.isArray(target) {
    	target.__proto__ = arrProto;    
    } else {	// 数组不进行深度监听，原因：太损耗性能
    	// 重新定义各个属性（for in 也可以遍历数组）
        for (let key in target) {
            // 递归监听对象内属性
            defineReactive(target, key, target[key]);
        }   
    }
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
	observer(value);
    
    // 核心API
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue);
                
                // 设置新值，注意：value一直在闭包中，此处设置完之后，在get时也是会获取最新的值
                value = newValue;
                
                // 触发更新视图
                updateView();
            }
        }
    }
}
```

总结：vue2的响应式是基于`Object.defineProperty`实现。

问题：

- 数组类型为什么不能监听到根据数组索引的修改？
  根据对象的key对数据进行修改是可以被监听到并触发更新渲染，但是由于数组一般长度会比较长，所以监听数组中的每一个索引对性能损耗较大，所以在底层不支持对数组进行深度监听，但是直接覆盖数组可实现渲染。原因是对value为数组的key值进行了监听。
- 对象类型为什么不能监听到property的添加或者移除？
  因为vue2响应式数据是通过Object.defineProperty中的get回调和set回调来对实际数据进行代理，即数据劫持和数据监听，所以当给对象add或者del属性的时候并没有相应的监听回调，所以无法触发更新渲染。
- vue2如何解决这个问题：
  vue2增加`$set`响应式监听 数组索引的修改 和 对象属性的添加；增加`$delete`监听对象属性的删除
  `this.$set(obj, key, val)`、`this.$delete(obj, key)`



#### vue3源码

```js
// 触发更新视图回调
function updateview() {
    console.log("试图更新");
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype;
// 创建新对象，原型指向oldArrayProperty，再扩展新的方法不会影响原数组原型
const arrproto = Object.create(oldArrayProperty);
["push", "pop", "shift", "unshift", "splice"].forEach(methodName => {
    arrProto[methodName] = function() {
        updateView();	// 触发视图更新
        oldArrayproperty[methodName].call(this, ...arguments);
    }
})

// 分解对象属性函数
function observer(target) {
	if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target;
    }
    
    if (Array.isArray(target) {
    	target.__proto__ = arrProto;    
    } else {	// 数组不进行深度监听，原因：太损耗性能
    	// 重新定义各个属性（for in 也可以遍历数组）
        for (let key in target) {
            // 递归监听对象内属性
            defineReactive(target, key, target[key]);
        }   
    }
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
	observer(value);
    
    // 核心API
    const proxyData = new Proxy(target, {
        get(target, key, receive) {
            // 只处理本身（非原型）的属性
            const ownKeys = Reflect.ownKeys(target);
            if (ownKeys.includes(key)) {
                console.log('get', key);	// 监听
            }
            const Reflect.get(target, key, receive);
            return result;
        },
        set(target, key, val, receive) {
            // 重复的数据，不处理
            const oldVal = target[key];
            if (val == oldVal) {
                return true;
            }
            const result = Reflect.set(target, key, val, receive);
            // 操作成功，更新渲染
            if (result) {
                updateview();
            }
            return result;
        }
        // 删除属性
        deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key);
        // 操作成功，更新渲染
        if (result) {
            updateview();
        }
        return result;
    }
    })
}
```

总结：vue3的响应式是基于ES6的`Proxy`配合`Reflect`

`Reflect`的两个方法：

- `get(target, key, receiver)`：个人理解就是，访问`target`的`key`属性，但是`this`是指向`receiver`，所以实际是访问的值是`receiver的key`的值，但是这可不是直接访问`receiver[key]`属性；
- `set(target, key, value, receiver)`：个人理解就是，设置`target`的`key`属性为`value`，但是`this`是指向`receiver`，所以实际是是设置`receiver的key`的值为`value`，但这可不是直接`receiver[key] = value`。

问题：

- 为什么不能直接`receive[key]`或者`receive[key]=value`，而是通过`Reflect.get`和`Reflect.set`
  如果使用`receive`直接访问或者修改会导致`set`回调和`get`回调重复执行，导致栈溢出。
- 为什么要使用`proxy`和`Reflect`一起，也可使用`target[key]`进行属性访问和修改？
  `receive`是`new Proxy`创建出来的代理对象，`target`为原对象。因为`target`有可能是另一个代理的代理对象，所以如果`this`一直放到`target`上面，出bug的概率会大大提高，所以需要将`this`放在代理对象`receive`上。



vue2的缺陷

- 检测不到对象属性的添加和删除；
- 数组API方法无法监听到，通过Array的原型，实现对数组的监听；
- 需要对每个属性进行遍历监听，如果嵌套对象，需要深度监听，造成性能问题。



为什么使用Proxy？

1. Object.defineProperty只能劫持对象的属性，而Proxy是直接代理对象。
   `Object.defineProperty`只能遍历对象属性进行劫持；`Proxy`直接可以劫持整个对象，并返回一个新对象，可以直接操作新的对象达到响应式目的。

2. `Object.defineProperty`对新增属性需要手动进行`observe`
   由于 `Object.defineProperty` 劫持的是对象的属性，所以新增属性时，需要重新遍历对象，对其新增属性再使用 `Object.defineProperty` 进行劫持。
   也正是因为这个原因，使用vue给 `data` 中的数组或对象新增属性时，需要使用 `vm.$set` 才能保证新增的属性也是响应式的。

3. `Proxy`支持13中拦截操作，是`defineProperty`不具备的
   1、**get(target, propKey, receiver)**：拦截对象属性的读取，比如 `proxy.foo` 和 `proxy['foo']` 。

   2、**set(target, propKey, value, receiver)**：拦截对象属性的设置，比如 `proxy.foo = v` 或 `proxy['foo'] = v` ，返回一个布尔值。

   3、**has(target, propKey)**：拦截 `propKey in proxy` 的操作，返回一个布尔值。

   4、**deleteProperty(target, propKey)**：拦截 `delete proxy[propKey]` 的操作，返回一个布尔值。

   5、**ownKeys(target)**：拦截 `Object.getOwnPropertyNames(proxy)` 、 `Object.getOwnPropertySymbols(proxy)` 、`Object.keys(proxy)` 、`for...in` 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 `Object.keys()` 的返回结果仅包括目标对象自身的可遍历属性。

   6、**getOwnPropertyDescriptor(target, propKey)**：拦截 `Object.getOwnPropertyDescriptor(proxy, propKey)` ，返回属性的描述对象。

   7、**defineProperty(target, propKey, propDesc)**：拦截 `Object.defineProperty(proxy, propKey, propDesc）` 、`Object.defineProperties(proxy, propDescs)` ，返回一个布尔值。

   8、**preventExtensions(target)**：拦截 `Object.preventExtensions(proxy)` ，返回一个布尔值。

   9、**getPrototypeOf(target)**：拦截 `Object.getPrototypeOf(proxy)` ，返回一个对象。

   10、**isExtensible(target)**：拦截 `Object.isExtensible(proxy)` ，返回一个布尔值。

   11、**setPrototypeOf(target, proto)**：拦截 `Object.setPrototypeOf(proxy, proto)` ，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

   12、**apply(target, object, args)**：拦截 `Proxy` 实例作为函数调用的操作，比如 `proxy(...args)`、`proxy.call(object, ...args)` 、`proxy.apply(...)` 。

   13、**construct(target, args)**：拦截 `Proxy` 实例作为构造函数调用的操作，比如 `new proxy(...args)` 。

proxy兼容性差

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/12/16dbf9afd543e53f~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)



### vue的插槽

#### 1、默认插槽

> 给子组件中传递子元素，只有一个根元素；子组件中使用`slot`标签表示子元素。

#### 2、具名插槽

> 子元素中使用属性`slot="插槽名"`或者`v-slot:插槽名`，子组件中给`slot`元素添加`name`属性来判断和哪个子元素匹配。

#### 3、作用域插槽

> 子元素的根元素中添加属性`scope="data"`，`data`则会是子组件中给`slot`标签添加`:data="data"`属性，则可以在该根元素中使用。



### vue的Hooks

> vue2中的`mixin`有什么不足？
>
> 在vue2中，`mixin`是将部分组件逻辑抽象成可复用块的主要工具。但是存在几个问题：
>
> 1. `Mixin`很容易产生冲突：因为每个mixin的`property`都被合并到同一个组件中，所以为了避免`property`名冲突，必须要了解其他`property`。
> 2. 可重用性是有限的：不能向`mixin`传递任何参数改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。

#### 1、Mixin难以追溯的方法与属性

> Vue3自定义Hooks，引用时将响应式变量或者方法显示暴露出来如：
>
> `const {nameRef, fn} = useXX()`

举例：

```js
// a.js
import {ref, watch} from 'vue'
const useAdd = ({ num1, num2 } => {
	const addNum = ref(0);
	watch([num1, num2], ([num1, num2]) => {
		addFn(num1, num2);
	})
	const addFn = (num1, num2) => {
		addNum.value = num1 + num2;
	}
	return {
		addNum,
		addFn
	}
})
export defaault useAdd;

// b.js
import {ref} from 'vue'
import useAdd from './a.js'
const num1 = ref(1);
const num2 = ref(2);
const {addNum, addFn} = useAdd({num1, num2});
addFn(num1.value, num2.value)
```

每个Hooks显示暴露出来的响应式变量和方法。

#### 2、无法向Mixin传递参数来改变逻辑

> Vue3自定义Hooks可以灵活传递任何参数来改变它的逻辑，参数不限于其他hook的暴露出来的变量，这提高了Vue3在抽象逻辑方面的灵活性。

#### 3、Mixin同名变量会被覆盖

> ES6对象结构解析可以给变量进行重命名。

#### 总结

> Vue2时代`Option Api,data,methods,watch......`分开写，这种是**碎片化**的分散的，代码一多就容易**高耦合**，维护时来会切换代码繁琐
>
> Vue3时代`Composition Api`，通过利用各种Hooks将碎片化的响应式变量和方法**按功能分块写**，实现**高内聚低耦合**
>
> Vue3自定义Hooks是组件下的函数作用域的，而Vue2时代的Mixins是组件下的全局作用域。



### nextTick的实现原理

> 主要作用：在下次DOM更新循环结束之后执行延迟回调。

nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用：

- Promise
- MutationObserver
- setImmediate
- 如果以上都不行就采用setTimeout

定义一个异步方法，多次调用nextTick会讲方法存入到队列中，通过异步方法清空当前队列。



### Vue.set方法如何实现

- vue给对象和数组本身都增加了dep属性
- 当给对象新增不存在的属性的时候，就会触发对象依赖的watcher来更新
- 当修改数组索引的时候，就调用数组本身的splice方法来更新数组


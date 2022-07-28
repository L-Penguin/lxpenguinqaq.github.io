### React性能优化

#### `React.memo()`

> `React.memo`其实就是一个高阶组件。其接收一个组件作为参数，返回一个新组件。
>
> 这个新组件只有在其`props`更改时，才会重新渲染这个组件，否则将直接返回“记忆”中的上一次的结果。

```js
// Child
function Child(props) {
    return <div>{props.name}</div>
}
```

```javascript
// App
class App extends React.Component() {
	state = {
		title: '',
	};
	changeTitle = () => {
		this.setState({
			title: 'i am changed!',
		});
	};
	render() {
		return (
			<div>
				<span>{this.state.title}</span>
            	<button onClick={this.changeTitle}>Click Me</button>
				<Child name="sample"/>
			</div>
		)
	}
}
```

假如点击按钮，则会修改父组件App中的`title`，并没有更新`Child`组件所接收的`name`。但是当`title`更新后，不仅`App`组件会重新渲染，`Child`组件也会重新渲染。

为了避免这种情况，可以使用`React.memo()`

```js
function Child(props) {
    return <div>{props.name}</div>;
}

export default React.memo(Child);
```

`React.memo`默认只会对`props`做浅比较。如果需要做深度比较，可以传入第二个参数

```js
React.memo(Child, (preProps, nextProps) => {});
```



#### `useCallback()`

> 这个`Hook`用于给子组件传递了函数的情况下跳过渲染。

```js
// Child
function Child(props) {
    return (
        <div>
            <span>{props.name}</span>
            <button onClick={props.changeTitle}>Click Me</button>
        </div>
    );
}

export default React.memo(Child);
```

```js
// App
class App extends React.Component() {
    state = {
        title: '',
        subTitle: '',
    };
    changeTitle = () => {
        this.setState({
            title: 'i am changed!',
        });
    };
    changeSubTitle = () => {
        this.setState({
            subTitle: 'subTitle Changed!',
        });
    };
    render() {
        return (
            <div>
                <span>{this.state.title}</span>
                <button onClick={this.changeSubTitle}>Click Me</button>
                <Child name="zxl" changeTitle={this.changeTitle} />
            </div>
        );
    }
}
```

无论点击 `App` 中的按钮改变 `subTitle` ，还是点击 `Child` 中的按钮改变 `title`。都会触发 `Child` 的更新。

注意到`App`中的`ChangeTitle`是我们传入`Child`的`props`的属性。而当`App`更新的时候，会重新创建一个`changeTitle`函数。这就是问题所在。

`useCallback`就可以解决这类问题。

```js
// App
import React, { useCallback } from 'react';
class App extends React.Component() {
    state = {
        title: '',
        subTitle: '',
    };
    changeTitle = () => {
        this.setState({
            title: 'i am changed!',
        });
    };
    changeSubTitle = () => {
        this.setState({
            subTitle: 'subTitle Changed!',
        });
    };
    render() {
        const memoizedCallback = useCallback(this.changeTitle, []);
        return (
            <div>
                <span>{this.state.title}</span>
                <button onClick={this.changeSubTitle}>Click Me</button>
                <Child name="zxl" changeTitle={memoizedCallback} />
            </div>
        );
    }
}
```

这种情况下，传递给子组件的函数在父组件刷新的时候不会改变，既不会触发更新渲染。



#### `useMemo()`

> 当有一个函数需要很长时间执行，而其值影响到了`DOM`的渲染，但并不是唯一因素的时候，这个时候就需要用到这个`Hook`函数。

```js
function Cal() {
    const [count, setCount] = useState(0);
    const longTimeCal = () => {
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += i;
        }
        return result;
    };
    const value = longTimeCal();
    return (
        <div>
            <span>{count + value}</span>
            <button onClick={(count) => setCount(count + 1)} />
        </div>
    );
}
```

每次重新渲染的时候都需要重新计算一遍这个函数的值。造成性能损耗。

可以使用`useMemo`做优化

```js
function Cal() {
    const [count, setCount] = useState(0);
    const longTimeCal = () => {
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += i;
        }
        return result;
    };
    const value = useMemo(longTimeCal, []);
    return (
        <div>
            <span>{count + value}</span>
            <button onClick={(count) => setCount(count + 1)} />
        </div>
    );
}
```

这个`hook`函数会将value这个值给缓存下来，只有参数2中变化时才会重新计算。
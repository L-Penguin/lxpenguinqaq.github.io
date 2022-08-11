# React杂文

> 关于React学习的只是碎片杂文

## API方面

> 以下内容是关于API的介绍和使用总结。

### forWardRef

> `import React, {fowWardRef} from 'react'`或者使用`React.forWardRef()`
>
> `forWardRef`字面意思理解为转发Ref，它会创建一个React组件，这个组件能够将其接收的ref属性转发到其组件树下的另一个组件中。其主要作用：
>
> 1. **转发refs到DOM组件**（ref不像props作为参数可以传递，所以要想传递ref得用forwardRef）
>
>    ```jsx
>    const FancyButton = React.forwardRef((props, ref) => (
>      <button ref={ref} className="FancyButton">
>        {props.children}
>      </button>
>    ));
>    
>    // You can now get a ref directly to the DOM button:
>    const ref = React.createRef();
>    <FancyButton ref={ref}>Click me!</FancyButton>;
>    ```
>
>    **因此，当React附加了ref属性之后，ref.current将直接指向DOM元素实例。**
>
>    如果一个组件被多次使用，正常情况下想要调用器组件内的方法需要传入props来调用，每次传入的话就比较多余。所以就引入了React.forwardRef。
>
>    ```tsx
>    interface SelectFileModalRef {
>      handleShowModal: () => void;
>      handleCancel: () => void;
>    }
>    const SelectFileModal = forwardRef<SelectFileModalRef, Props>(
>      (props: Props, ref: Ref<SelectFileModalRef>) => {
>       useImperativeHandle(ref, () => ({
>          handleShowModal,
>          handleCancel,
>        }));
>      
>      }
>    );
>    ```

### useImperativeHandle

> `import React, {useImperativeHandle} from 'react'`或者使用`React.useImperativeHandle()`
>
> `useImperativeHandle`可以让你在使用ref时自定义暴露给父组件的实例值。通常与`forwardRef`一起使用，暴露之后父组件就可以通过`selectFileModalRef.current?.handleCancel;`来调用子组件的暴露方法。

```jsx
 useImperativeHandle(ref, () => ({
     handleShowModal,
     handleCancel,
 }));
```



## 组件方面

> 以下内容是关于原生的组件的使用及属性介绍。
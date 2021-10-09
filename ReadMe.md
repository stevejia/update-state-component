# 介绍
## 该组件基于React.Component 类封装
### 使用场景：
 #### 声明Class类型的react 组件
 #### 基于ant UI组件库
 ### 具体功能点：
 #### 1. 提供静态方法updateStateFromProps(propsData, preState)
 ##### 使用在React的静态方法getDerivedStateFromProps 用于props和state之间的数据映射
 例如：
 <span style="color:#ab4642">static getDerivedStateFromProps(nextProps, preState) {
      &nbsp;&nbsp; &nbsp;&nbsp;const { obj1, obj2, obj3 } = nextProps;
      &nbsp;&nbsp; &nbsp;&nbsp;const newState = Clsxxx.updateStateFromProps({ obj1, obj2, obj3 }, preState);
       &nbsp;&nbsp; &nbsp;&nbsp;return newState;
  }</span>
updateStateFromProps方法中在映射的同时会向state中默认添加originobj1的对象用于进行与propsData中新的对象值进行比较，如果没有变化则不处理，如果有变化则返回当前propsData中的对象作为state的最新值
####  2.提供stateChange(prop, eventOrValue, withPropState)
用于更新深调用链的state对象
//更新model中的属性
this.stateChange("xxx.xxx.xxx",  eventOrValue);
//更新非model中的属性
this.stateChange("xxx.xxx.xxx",  eventOrValue,  false);
# 完整示例
```
import UpdateStateComponent from "..";

interface ExampleProps {
  obj1: { attr1: string; attr2: number };
  obj2: any;
  obj3: Array<any>;
  obj4: any;
}

interface ExampleState {
  obj1: { attr1: string; attr2: number };
  obj2: any;
  obj3: Array<any>;
  model: {
    a1: {
      a2: {
        a3: string;
      };
    };
  };
  obj5: {
    b1: {
      b2: string;
    };
  };
}

class Example extends UpdateStateComponent<ExampleProps, ExampleState> {
  constructor(props: ExampleProps) {
    super(props, "model");
  }
  static getDerivedStateFromProps(
    nextProps: ExampleProps,
    preState: ExampleState
  ) {
    //映射obj1, obj2, obj3到state 如果有props更新的话
    const { obj1, obj2, obj3 } = nextProps;
    const newState = Example.updateStateFromProps(
      { obj1, obj2, obj3 },
      preState
    );
    return newState;
  }

  render() {
    const {
      model: {
        a1: {
          a2: { a3 },
        },
      },
      obj5: {
        b1: { b2 },
      },
    } = this.state;
    return (
      <div className="example-container">
        <input
          value={a3}
          onChange={(e) => this.stateChange("a1.a2.a3", e)}
        ></input>
        <input
          value={b2}
          onChange={(e) => this.stateChange("obj5.b1.b2", e, false)}
        ></input>
      </div>
    );
  }
}

```




 
      
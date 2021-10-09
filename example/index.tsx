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

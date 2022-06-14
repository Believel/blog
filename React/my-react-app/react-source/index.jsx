import { useReducer, useState, useEffect, useLayoutEffect, Component } from "./react/react";
import ReactDOM from "./react/react-dom";

import "./index.css";

// fiber.memeorizedState(hook0)->next(hook1)->next(hook2)->next(hook3)(workInProressHook)
// workInProressHook
function FunctionComponent(props) {
  const [count2, setCount2] = useReducer((x) => x + 1, 0); //hook1
  const [count1, setCount1] = useState(2); // hook2

  useEffect(() => {
    console.log(`zjr useEffect, ${count2}`)
  }, [count2])

  useLayoutEffect(() => {
    console.log(`zjr useLayoutEffect, ${count2}`)
  }, [count2])
  return (
    <div className="border">
      <p>{props.name}</p>

      <button
        onClick={() => {
          setCount1(count1 + 1);
        }}>
        {count1}
      </button>

      <button
        onClick={() => {
          setCount2();
        }}>
        {count2}
      </button>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <h3>{this.props.name}</h3>
        我是classComponent的文本内容
      </div>
    )
  }
}

function FragmentComponent() {
  return (
    <ul>
      <>
        <li>part1</li>
        <li>part2</li>
      </>
    </ul>
  )
}

const jsx = (
  <div className="border">
    <h1>react</h1>
    <a href="https://www.kaikeba.com/">zjr</a>
    <FunctionComponent name="函数" />
    <ClassComponent name="类组件" />
    <FragmentComponent />
  </div>
);

// ReactDOM.render(jsx, document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(jsx);

// 原生标签
// 文本节点

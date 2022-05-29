import { useReducer } from "./react/react";
import ReactDOM from "./react/react-dom";

import "./index.css";

// fiber.memeorizedState(hook0)->next(hook1)->next(hook2)->next(hook3)(workInProressHook)
// workInProressHook
function FunctionComponent(props) {
  const [count2, setCount2] = useReducer((x) => x + 1, 0); //hook1

  return (
    <div className="border">
      <p>{props.name}</p>

      {/* <button
        onClick={() => {
          setCount1(count1 + 1);
        }}>
        {count1}
      </button> */}

      <button
        onClick={() => {
          setCount2();
        }}>
        {count2}
      </button>
    </div>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="函数" />
  </div>
);

// ReactDOM.render(jsx, document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(jsx);

// 原生标签
// 文本节点

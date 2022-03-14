import React, { useState } from "react";
import bgImg from "../images/bg.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h4>我是页面: {count}</h4>
      <img src={bgImg} alt="" />
      <button type="button" onClick={() => setCount(count + 1)}>
        店家
      </button>
    </div>
  );
}
export default App;

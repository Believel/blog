import { useState } from 'react'
function MessageThread() {
  const [message, setMessage] = useState('');

  const showMessage = () => {
    // 在函数式组件中，你也可以拥有一个在所有的组件渲染帧中共享的可变变量。它被成为“ref”：
    alert('You said: ' + message);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

export default MessageThread
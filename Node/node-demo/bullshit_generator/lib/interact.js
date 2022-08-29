import readline from 'readline';
/**
 * 使用 process.stdin
 * 接收定义好的一系列问题，并等待用户一一回答
 * @param {Array<{text, value}>} questions 
 */
export function interact(questions) {
  process.stdin.setEncoding('utf8')
  return new Promise((resolve) => {
    const answers = []
    let i = 0;
    let { text, value } = questions[i++]
    console.log(`${text}(${value})`)
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read().slice(0, -1)
      // 保存用户的输入，如果用户输入为空，则使用缺省值
      answers.push(chunk || value)
      const nextQuestion = questions[i++]
      // 如果问题还有，继续监听用户的输入
      if (nextQuestion) {
        process.stdin.read()
        text = nextQuestion.text
        value = nextQuestion.value
        console.log(`${text}(${value})`)
      } else {
        // 利用异步机制 - Promise来结束用户输入的监听事件
        resolve(answers)
      }
    })
  })
}



function question(rl, {text, value}) {
  const q = `${text}(${value})\n`;
  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer || value);
    });
  });
}
/**
 * 使用 readline 实现交互式问答
 * @param {*} questions 
 * @returns 
 */
export async function interact1(questions) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answers = [];
  for(let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(rl, q); // 等待问题的输入
    answers.push(answer);
  }
  rl.close();
  return answers;
}
// 本地文件引入的时，默认是要带扩展名，
// 但是可以通过babel插件处理成不带扩展名
import { createRandomPicker, randomInt } from './random.js'
// 替换句子
function sentence(pick, replacer) {
  // 得到内容
  let ret = pick()
  // 遍历要替换的占位符
  for (const key in replacer) {
    ret = ret.replace(new RegExp(`{{${key}}}`, 'g'), typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]);
  }
  return ret
}

/**
 * 生成文章内容
 * @param {*} title 标题
 * @param {*} param1 corpus：语料库，min：文章最小字数，max：文章最大字数
 */
export function generate(title, { corpus, min = 6000, max = 10000}) {
  const articleLength = randomInt(min, max)
  // 名人    废话前置   废话主题   片段   结论
  const { famous, bosh_before, bosh, said, conclude } = corpus;
  // 随机得到函数
  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [famous, bosh_before, bosh, said, conclude].map((item) => {
    return createRandomPicker(item);
  });
  const article = []
  let totalLength = 0
  while(totalLength < articleLength) {
    // 假设：规定每个段落的字数在200~500字之间。每个段落包含20%的名人名言，80%的废话
    // 如果文章内容的字数未超过文章总字数
    let section = ''; // 添加段落
    const sectionLength = randomInt(200, 500); // 将段落长度设为200到500字之间
    // 如果当前段落字数小于段落长度，或者当前段落不是以句号。和问号？结尾
    while(section.length < sectionLength || !/[。？]$/.test(section)) {
      // 取一个 0~100 的随机数
      const n = randomInt(0, 100);
      if(n < 20) { // 如果 n 小于 20，生成一条名人名言，也就是文章中有百分之二十的句子是名人名言
        section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude});
      } else if(n < 50) {
        // 如果 n 小于 50，生成一个带有前置从句的废话
        section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title});
      } else {
        // 否则生成一个不带有前置从句的废话
        section += sentence(pickBosh, {title});
      }
    }
    // 段落结束，更新总长度
    totalLength += section.length;
    // 将段落存放到文章列表中
    article.push(section);
  }
  // 将文章返回，文章是段落数组形式
  return article;
}
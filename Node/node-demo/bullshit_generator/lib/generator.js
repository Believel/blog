import { createRandomPicker } from './random'
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
  // 名人    废话前置   废话主题   片段   结论
  const { famous, bosh_before, bosh, said, conclude } = corpus;
  // 随机得到函数
  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [famous, bosh_before, bosh, said, conclude].map((item) => {
    return createRandomPicker(item);
  });
  sentence(pickFamous, { said: pickSaid, conclude: pickConclude }); // 生成一条名人名言
  sentence(pickBosh, { title });  // 生成一条废话
}
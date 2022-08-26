import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import moment from 'moment'

const __dirname = dirname(fileURLToPath(import.meta.url))
// 读取文件
export function loadCorpus(src) {
  const path = resolve(__dirname, src)
  const data = readFileSync(path, { encoding: 'utf-8'})
  return JSON.parse(data)
}
// 保存文件
export function saveCorpus(title, article) {
  // 输出的目录
  const outputDir = resolve(__dirname, '..', 'output')
  const time = moment().format('|YYYY-MM-DD|HH:mm:ss');
  // 输出的文件名
  const outputFile = resolve(outputDir, `${title}${time}.txt`)
  // 检查 outputDir 是否存在，没有就创建一个
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir)
  }
  const text = `${title}\n\n  ${article.join('\n ')}`
  // 将 text 写入 outputFile 文件中
  writeFileSync(outputFile, text)
}
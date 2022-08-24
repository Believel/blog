import foo from './foo.js'
import { version } from '../package.json'
export default () => {
  console.log(foo + version)
}
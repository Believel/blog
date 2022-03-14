const path = require('path')
module.exports = {
  srcPath: (url) => {
    return path.resolve(__dirname, url)
  }
}
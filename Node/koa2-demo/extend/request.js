const url = require("url");

module.exports = {
  get query() {
    return url.parse(this.request.url, true).query
  }
}
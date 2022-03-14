const path = document.querySelector('meta[name="AppPublic"]')

if (process.env.NODE_ENV === 'production') {
  __webpack_public_path__ = path ? path.getAttribute('content'):'/'
}
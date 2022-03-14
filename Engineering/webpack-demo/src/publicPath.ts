const path = document.querySelector('meta[name="AppPublic"]')

if (process.env.NODE_ENV === 'production') {
  // @ts-ignore
  __webpack_public_path__ = path ? path.getAttribute('content'):'/'
}
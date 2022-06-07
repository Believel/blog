// 平铺对象
const flatMap = (obj) => {
  const res = {}
  const g = (obj, prefix) => {
    if (Array.isArray(obj)) {
      obj.forEach((list, index) => {
        g(list, `${prefix}[${index}]`)
      })
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        const curPrefix = prefix ? `${prefix}.` : ''
        g(obj[k], `${curPrefix}${k}`)
      })
    } else {
      res[prefix] = obj
    }
  }
  g(obj, '')
  return res
}

flatMap({
  trade: {
    aa: 1,
    bb: 2
  },
  des: {
    f: {
      des: 'q',
      ni: 'ww'
    },
    w: 3
  },
  buy: [
    {
      id: '1111',
      date: '2022-06'
    }
  ],
  bu: [2, 3]
})

// {
//   "bu[0]": 2,
//   "bu[1]": 3,
//   "buy[0].id": "1111",
//   "buyers[0].date": "2022-06",
//   "des.f.des": "q",
//   "des.f.ni": "ww",
//   "des.w": 3,
//   "trade.aa": 1,
//   "trade.bb": 2
// }

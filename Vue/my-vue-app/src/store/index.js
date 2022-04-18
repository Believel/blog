import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count1: 0
    }
  },
  mutations: {
    increment (state) {
      state.count1++
    }
  },
  getters: {
    updateCount1(state) {
      return state.count + 'nih'
    }
  },
  actions: {
    jumpCount1(context) {
      setTimeout(() => {
        context.commit('increment')
      }, 1000)
    }
  }
})

export default store
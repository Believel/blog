# redux-saga大体过程
> action1(plain object) -> redux-saga监听 -> 执行相应的Effect方法 -> 返回描述的对象 -> 恢复执行异步和副作用函数 -> action2(plain object)

# Effect的各种方法
```js
import { take, call, put, select, fork, takeEvery, takeLatest } from 'redux-saga/effects'
```

1. `take`
`take`用来监听action,返回监听到的action对象

```js
// 定义的action
const loginAction = {
  type:'CHECKOUT_REQUEST'
}
// 当UI中一个组件调用了：
dispatch(loginAction)
// 在saga中使用如下
const action = yield take('CHECKOUT_REQUEST');
// 返回值就是 dispatch 的原始对象：{type：'CHECKOUT_REQUEST'}

```
2. `call()`主要用于异步请求
```js
yield call(fn, ...args)
```

3. `put`

>  `redux-saga`执行完副作用函数后，必须发出action,然后这个action被reducer监听，从而达到更新state的目的。响应的这里的put对应与redux中的dispatch

```js
yield put({type: 'LOGIN', state: {}})
```

4. `select`: 获取state

```js
const state= yield select()
```
5. `fork`相当于web work，fork方法不会阻塞主线程，在非阻塞调用中十分有用
```js
fork(fn)
```


6. `takeEvery`和`takeLatest` 用于监听相应的动作并执行相应的方法

```js
// takeEvery可以同时监听到多个相同的action。
// takeLatest是会监听执行最近的那个被触发的action
yield takeEvery('CHECKOUT_REQUEST', incrementAsync)
```

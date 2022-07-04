import { put, takeEvery, all, fork} from 'redux-saga/effects'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
  console.log('Hello Sagas')
}
// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  // 执行完副作用函数之后，使用 put 派发 action,相当于redux中的 dispatch
  yield put({ type: 'INCREMENT'})
}
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  // takeEvery: 监听 INCREMENT_ASYNC 动作， 并执行 incrementAsync 方法
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    fork(helloSaga),
    fork(watchIncrementAsync)
  ])
}

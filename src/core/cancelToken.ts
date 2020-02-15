import { CancelExecutor, Canceler, CancelTokenSource } from '../types'
import Cancel from './cancel'

// 定义一个函数 : 该函数接收一个reason 不返回东西
interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  // 自身维护的promise 当xhr调用是会往它的onResolveCallbacks塞入一个回调函数
  // 该回调函数会调用 XMLHttpRequest.abort()
  promise: Promise<Cancel>
  reason?: Cancel

  // 注意 : CancelExecutor的参数是一个函数
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    // 实例化一个pending的promise对象
    this.promise = new Promise<Cancel>(resolve => {
      // 将resolvePromise 指向resolve
      resolvePromise = resolve
    })
    // 执行cancelExcutor函数 message是一个函数
    const canceler: Canceler = message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      // 将promise由 pending -> resolved 这样当
      resolvePromise(this.reason)
    }

    executor(canceler)
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}

// 当外部这样调用的时候
// let cancel
// const cancelToken = new CancelToken(function executor(c) {
//   cancel = c
// })
// 会将canceler返回
// 当canceler调用的时候，会将promise由 pending -> resolved状态
// 从而触发onResolveCallbacks
// 最后XMLHttpRequest.abort()

// 在Cratosw类中进行处理:
// 1. 引入
import CratoswInterceptorManager, { Interceptor } from './InterceptorManager'
import { CratoswRequestConfig, CratoswResponse } from './types'

const defaults: CratoswRequestConfig = {
  timeout: 0,
}
export default class Cratosw<T> {
  public defaults: CratoswRequestConfig = defaults

  // 2. 添加拦截器属性:
  public interceptors = {
    request: new CratoswInterceptorManager<CratoswRequestConfig>(),
    response: new CratoswInterceptorManager<CratoswResponse<T>>(),
  }

  dispatchRequest<T>(
    config: CratoswRequestConfig,
  ): Promise<CratoswResponse<T>> {
    return new Promise<CratoswResponse<T>>((resolve, reject) => {
      const { url, params, data, timeout } = config
      const response: CratoswResponse<T> = {
        data: '' as any,
        status: 200,
        statusText: '测试',
        config,
      }
      resolve(response)
    })
  }

  // 3. 处理串联逻辑，在request方法中进行处理:
  request(
    config: CratoswRequestConfig,
  ): Promise<CratoswRequestConfig | CratoswResponse<T>> {
    const chain: Array<
      Interceptor<CratoswRequestConfig> | Interceptor<CratoswResponse<T>>
    > = [
      {
        onFulfilled: this.dispatchRequest,
        onRejected: (error: any) => error,
      },
    ]
    this.interceptors.request.interceptors.forEach(
      (interceptor: Interceptor<CratoswRequestConfig> | null) =>
        interceptor && chain.unshift(interceptor),
    )
    this.interceptors.response.interceptors.forEach(
      (interceptor: Interceptor<CratoswResponse<T>> | null) =>
        interceptor && chain.push(interceptor),
    )
    let promise: any = Promise.resolve(config)
    while (chain.length) {
      const { onFulfilled, onRejected } = chain?.shift() ?? {}
      promise = promise.then(onFulfilled, onRejected)
    }
    return promise
  }
}

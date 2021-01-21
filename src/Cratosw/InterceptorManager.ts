// 这里是拦截器处理成功方法的类型
interface OnFulfilled<V> {
  (value: V): V | Promise<V> | undefined | null
}
// 这里的是拦截器处理失败时的方法类型定义
interface OnRejected {
  (error: any): any
}

// 定义一个拦截器类型： 可以包含有onFulfilled成功处理方法和onRejected失败处理方法
export interface Interceptor<V> {
  onFulfilled?: OnFulfilled<V> // 成功的回调
  onRejected?: OnRejected // 失败的回调
}

// 定义拦截器类:
// 这里的泛型T可能是CratoswRequestConfig, 也可能是CratoswResponse
// CratoswRequestConfig对应请求拦截器， CratoswResponse对应响应拦截器
export default class CratoswInterceptorManager<V> {
  // 拦截器数组，将会将这个数组中的拦截器内容和dispatchRepuest方法进行串联
  public interceptors: Array<Interceptor<V> | null> = []

  // 当调用use时，可以向拦截管理器中添加一个
  use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
    this.interceptors.push({
      onFulfilled,
      onRejected,
    })
    return this.interceptors.length - 1 // 返回拦截器在管理器数组中的位置，用于使用eject去除拦截器
  }

  eject(id: number) {
    if (this.interceptors[0]) {
      this.interceptors[id] = null
    }
  }
}

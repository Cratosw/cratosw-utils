import CratoswInterceptorManager from './InterceptorManager'

// 定义Cratosw请求的配置类型，及 Cratosw({})方法中的配置对象类型
// 这里只定义三个基础的配置参数，仅支持get请求的配置
export interface CratoswRequestConfig {
  url?: string
  params?: any
  data?: Record<string, any>
  timeout?: number
}

// Cratosw请求实例的类型， 及就是导出的Cratosw instance的类型
// Promise的泛型T代表Promise编成成功太之后resolve的值的类型
export interface CratoswInstance {
  <T = any>(config: CratoswRequestConfig): Promise<CratoswResponse<T>>
  // 为Cratosw instance类型添加拦截器类型: 这里的类型CratoswInterceptorManager是一个拦截器类
  // 拦截器分为请求拦截器和响应拦截器分别定义
  interceptors: {
    request: CratoswInterceptorManager<CratoswRequestConfig>
    response: CratoswInterceptorManager<CratoswResponse>
  }
}

// Cratosw请求成功后响应的类型
// 泛型T代表响应体的类型
export interface CratoswResponse<T = any> {
  data: T
  status: number
  statusText: string
  config?: CratoswRequestConfig
}

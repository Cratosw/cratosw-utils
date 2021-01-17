export interface CratoswRequestConfig {
  url?: string;
  baseURL?: string;
}
export interface CratoswPromise<T = any> extends Promise<CratoswResponse<T>> {
}
export interface CratoswResponse<T = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: CratoswRequestConfig;
  request?: any;
}
export interface CratoswInterceptorManager<V> {
  use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
  eject(id: number): void;
}
export interface CratoswInstance {
  (config: CratoswRequestConfig): CratoswPromise;
  (url: string, config?: CratoswRequestConfig): CratoswPromise;
  defaults: CratoswRequestConfig;
  interceptors: {
    request: CratoswInterceptorManager<CratoswRequestConfig>;
    response: CratoswInterceptorManager<CratoswResponse>;
  };
  getUri(config?: CratoswRequestConfig): string;
  request<T = any, R = CratoswResponse<T>> (config: CratoswRequestConfig): Promise<R>;
}

export interface CratoswStatic extends CratoswInstance {
  create(config?: CratoswRequestConfig): CratoswInstance;
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
}

function InterceptorManager(){
  this.handlers:any[] = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number{
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {

};
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Cratosw(instanceConfig:CratoswRequestConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Cratosw.prototype.getUri = function getUri(config) {

  return "";
};
export default Cratosw;

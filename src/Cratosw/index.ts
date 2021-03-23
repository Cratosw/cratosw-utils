// 这里引入Cratosw类，将会在之后进行定义
import Cratosw from './CratoswCore'
import { CratoswInstance } from './types'

// 用于创建一个Cratosw实例
function createInstance(): CratoswInstance {
  const context = new Cratosw() // 之后绑定this指针的上下文
  // 让request方法里的this永远指向context, 也就是new Cratosw()的实例
  let instance = Cratosw.prototype.request.bind(context)
  // 把Cratosw类的实例和类的原型上的方法都拷贝到instance上，也就是request方法上
  instance = Object.assign(instance, Cratosw.prototype, context)
  return instance as CratoswInstance
}
// 这里获取到的Cratosw实例就是在createInstance方法中创建的instance实例，类型为CratoswInstance
const cratosw = createInstance()
export { cratosw }

// 同时从入口文件导出Cratosw中的类型定义
export * from './types'

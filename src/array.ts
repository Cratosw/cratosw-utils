/**
 * reduce(acc,cur,idx,src) 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
 *Accumulator (acc) (累计器) 它是上一次调用回调时返回的累积值，或initialValue
 * Current Value (cur) (当前值)
 * Current Index (idx) (当前索引)
 * Source Array (src) (源数组)
 * arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
 */

Array.prototype.firstOrDefault = function firstOrDefault(
  predicate: (item: any) => boolean,
) {
  for (let i = 0; i < (<Array<any>>this).length; i++) {
    const item = (<Array<any>>this)[i]
    if (predicate(item)) {
      return item
    }
  }
  return null
}
/**
 *
 */
Array.prototype.reduceMap = function reduceMap(callback:(cur:any, index:number, array:any[])=>any) {
  return this.reduce((acc, cur, index, array) => {
    const item = callback(cur, index, array)
    acc.push(item)
    return acc
  }, [])
}
Array.prototype.firstOrDefault = function (predicate: (item: any) => boolean) {
  for (var i = 0; i < (<Array<any>>this).length; i++) { let item = (<Array<any>>this)[i]; if (predicate(item)) { return item; } } return null;
}
Array.prototype.where = function (predicate: (item: any) => boolean) {
  let result:any[] = [];
  for (var i = 0; i < (<Array<any>>this).length; i++) {
    let item:any = (<Array<any>>this)[i];
    if (predicate(item)) {
       result.push(item);
    }
  }
  return result;
}
Array.prototype.remove = function (item: any): boolean {
  let index = (<Array<any>>this).indexOf(item);
  if (index >= 0) {
    (<Array<any>>this).splice(index, 1);
    return true;
  }
  return false;
}
Array.prototype.removeRange = function (items: any[]): void {
  for (var i = 0; i < items.length; i++) {
    (<Array<any>>this).remove(items[i]);
  }
}
Array.prototype.add = function (item: any): void {
  (<Array<any>>this).push(item);
}
Array.prototype.addRange = function (items: any[]): void {
  for (var i = 0; i < items.length; i++) {
    (<Array<any>>this).push(items[i]);
  }
}
Array.prototype.orderBy = function (propertyExpression: (item: any) => any) {
  let result = [];
  var compareFunction = (item1: any, item2: any): number => {
    if (propertyExpression(item1) > propertyExpression(item2)) return 1; if (propertyExpression(item2) > propertyExpression(item1)) return -1; return 0;
  }
  for (var i = 0; i < (<Array<any>>this).length; i++) {
    return (<Array<any>>this).sort(compareFunction);
  }
  return result;
}
Array.prototype.orderByDescending = function (propertyExpression: (item: any) => any) {
  let result = [];
  var compareFunction = (item1: any, item2: any): number => {
    if (propertyExpression(item1) > propertyExpression(item2)) return -1;
    if (propertyExpression(item2) > propertyExpression(item1)) return 1; return 0;
  }
  for (var i = 0; i < (<Array<any>>this).length; i++) {
    return (<Array<any>>this).sort(compareFunction);
  }
  return result;
}
Array.prototype.orderByMany = function (propertyExpressions: [(item: any) => any]) {
  let result = [];
  var compareFunction = (item1: any, item2: any): number => {
    for (var i = 0; i < propertyExpressions.length; i++) {
      let propertyExpression = propertyExpressions[i];
      if (propertyExpression(item1) > propertyExpression(item2)) return 1;
      if (propertyExpression(item2) > propertyExpression(item1)) return -1;
    } return 0;
  }
  for (var i = 0; i < (<Array<any>>this).length; i++) {
    return (<Array<any>>this).sort(compareFunction);
  }
  return result;
}
Array.prototype.orderByManyDescending = function (propertyExpressions: [(item: any) => any]) {
  let result = []; var compareFunction = (item1: any, item2: any): number => {
    for (var i = 0; i < propertyExpressions.length; i++) {
      let propertyExpression = propertyExpressions[i];
      if (propertyExpression(item1) > propertyExpression(item2)) return -1;
      if (propertyExpression(item2) > propertyExpression(item1)) return 1;
    } return 0;
  }
  for (var i = 0; i < (<Array<any>>this).length; i++) {
    return (<Array<any>>this).sort(compareFunction);
  } return result;
}

Array.prototype.reduceForEach = function(callback) {
  this.reduce((acc, cur, index, array) => {
    callback(cur, index, array)
  }, [])
}
Array.prototype.reduceFilter = function (callback) {
  return this.reduce((acc, cur, index, array) => {
   if (callback(cur, index, array)) {
     acc.push(cur)
   }
   return acc
 }, [])
}
Array.prototype.reduceFind = function (callback) {
  return this.reduce((acc, cur, index, array) => {
    if (callback(cur, index, array)) {
      if (acc instanceof Array && acc.length == 0) {
      	acc = cur
      }
    }
    // 循环到最后若 acc 还是数组，且长度为 0，代表没有找到想要的项，则 acc = undefined
    if ((index == array.length - 1) && acc instanceof Array && acc.length == 0) {
      acc = undefined
    }
    return acc
  }, [])
}
/**
 * Runs promises from array of functions that can return promises
 * in chained manner
 *
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// Function composition enabling pipe functionality
const pipe = (...functions) => input => functions.reduce(
  (acc, fn) => fn(acc),
  input
);

if (!Array.prototype.mapUsingReduce) {
  Array.prototype.mapUsingReduce = function(callback, thisArg) {
    return this.reduce(function(mappedArray, currentValue, index, array) {
      mappedArray[index] = callback.call(thisArg, currentValue, index, array)
      return mappedArray
    }, [])
  }
}

export { }; // this file needs to be a module

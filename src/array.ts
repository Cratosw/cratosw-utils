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
Array.prototype.reduceMap = function reduceMap(callback: Function) {
  return this.reduce((acc, cur, index, array) => {
    const item = callback(cur, index, array)
    acc.push(item)
    return acc
  }, [])
}

export { }; // this file needs to be a module

Array.prototype.firstOrDefault = function (predicate: (item: any) => boolean) {
  for (var i = 0; i < (<Array<any>>this).length; i++) { let item = (<Array<any>>this)[i]; if (predicate(item)) { return item; } } return null;
}
Array.prototype.where = function (predicate: (item: any) => boolean) {
  let result = [];
  for (var i = 0; i < (<Array<any>>this).length; i++) {
    let item = (<Array<any>>this)[i]; if (predicate(item)) { result.push(item); }
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
Array.prototype.removeRange = function (items: any[]): void { for (var i = 0; i < items.length; i++) { (<Array<any>>this).remove(items[i]); } }
Array.prototype.add = function (item: any): void { (<Array<any>>this).push(item); }
Array.prototype.addRange = function (items: any[]): void { for (var i = 0; i < items.length; i++) { (<Array<any>>this).push(items[i]); } }
Array.prototype.orderBy = function (propertyExpression: (item: any) => any) {
  let result = [];
  var compareFunction = (item1: any, item2: any): number => { if (propertyExpression(item1) > propertyExpression(item2)) return 1; if (propertyExpression(item2) > propertyExpression(item1)) return -1; return 0;
} for (var i = 0; i < (<Array<any>>this).length; i++) { return (<Array<any>>this).sort(compareFunction); } return result; }
Array.prototype.orderByDescending = function (propertyExpression: (item: any) => any) { let result = []; var compareFunction = (item1: any, item2: any): number => { if (propertyExpression(item1) > propertyExpression(item2)) return -1; if (propertyExpression(item2) > propertyExpression(item1)) return 1; return 0; } for (var i = 0; i < (<Array<any>>this).length; i++) { return (<Array<any>>this).sort(compareFunction); } return result; }
Array.prototype.orderByMany = function (propertyExpressions: [(item: any) => any]) { let result = []; var compareFunction = (item1: any, item2: any): number => { for (var i = 0; i < propertyExpressions.length; i++) { let propertyExpression = propertyExpressions[i]; if (propertyExpression(item1) > propertyExpression(item2)) return 1; if (propertyExpression(item2) > propertyExpression(item1)) return -1; } return 0; } for (var i = 0; i < (<Array<any>>this).length; i++) { return (<Array<any>>this).sort(compareFunction); } return result; }
Array.prototype.orderByManyDescending = function (propertyExpressions: [(item: any) => any]) { let result = []; var compareFunction = (item1: any, item2: any): number => { for (var i = 0; i < propertyExpressions.length; i++) { let propertyExpression = propertyExpressions[i]; if (propertyExpression(item1) > propertyExpression(item2)) return -1; if (propertyExpression(item2) > propertyExpression(item1)) return 1; } return 0; } for (var i = 0; i < (<Array<any>>this).length; i++) { return (<Array<any>>this).sort(compareFunction); } return result; }


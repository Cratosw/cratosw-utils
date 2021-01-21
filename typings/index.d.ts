/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />

export class Observable<T> {
  map<U>(f: (x: T) => U): Observable<U>
}
declare global {
  interface Array<T> {
    firstOrDefault(predicate: (item: T) => boolean): T;
    where(predicate: (item: T) => boolean): T[];
    orderBy(propertyExpression: (item: T) => any): T[];
    orderByDescending(propertyExpression: (item: T) => any): T[];
    orderByMany(propertyExpressions: [(item: T) => any]): T[];
    orderByManyDescending(propertyExpressions: [(item: T) => any]): T[];
    remove(item: T): boolean;
    add(item: T): void;
    addRange(items: T[]): void;
    removeRange(items: T[]): void;
    reduceMap(callback:(cur:any, index:number, array:any[])=>any):T[];
  }
}

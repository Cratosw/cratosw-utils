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


/**
 * 判断是否是CSS Color
 * @param color 颜色
 */
export function isCssColor(color?: string | false): boolean {
  return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/)
}

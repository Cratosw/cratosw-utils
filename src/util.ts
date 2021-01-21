/**
 * 获取一个输入字符串（为处理粘贴事件而构建），如果它是有效的颜色字符串（hex、rgb、rgba、hsl、hsla），则返回该字符串；如果需要，则添加一个“#”字符；如果不是颜色，则返回null
 * @param input
 */
export function colorFromString(input: string) {
  const trimmed = input.trim()
  const hexRegexNoHash = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const rgbaRegex = /^rgba\((\d+(\.\d+)?, *){3}\d+(\.\d+)?\)$/
  const rgbRegex = /^rgb\((\d+(\.\d+)?, *){2}\d+(\.\d+)?\)$/
  const hslaRegex = /^hsla\(\d+(\.\d+)?, *(\d+(\.\d+)?%, *){2}\d+(\.\d+)?\)$/
  const hslRegex = /^hsl\(\d+(\.\d+)?, *\d+(\.\d+)?%, *\d+(\.\d+)?%\)$/

  if (trimmed.match(hexRegexNoHash)) {
    return `#${trimmed}`
  }
  if (
    trimmed.match(hexRegex) ||
    trimmed.match(rgbaRegex) ||
    trimmed.match(rgbRegex) ||
    trimmed.match(hslaRegex) ||
    trimmed.match(hslRegex)
  ) {
    return trimmed
  }
  return null
}

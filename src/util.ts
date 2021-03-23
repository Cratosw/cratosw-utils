import { performance, PerformanceObserver } from 'perf_hooks'

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
// 窗口激活状态监听
let vEvent = 'visibilitychange'
if (document.webkitHidden != undefined) {
  vEvent = 'webkitvisibilitychange'
}
function visibilityChanged() {
  if (document.hidden || document.webkitHidden) {
    document.title = '客官，别走啊~'
    console.log('Web page is hidden.')
  } else {
    document.title = '客官，你又回来了呢~'
    console.log('Web page is visible.')
  }
}
document.addEventListener(vEvent, visibilityChanged, false)

/**
 *观察长任务（performance 中Task）
 */
const observer = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    console.log(entry)
  }
})
observer.observe({ entryTypes: ['longtask'] })

/**
 * 监听网络变化
 */
const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection
let type = connection.effectiveType

function updateConnectionStatus() {
  console.log(
    `Connection type changed from ${type} to ${connection.effectiveType}`,
  )
  type = connection.effectiveType
}
connection.addEventListener('change', updateConnectionStatus)

window.addEventListener('DOMContentLoaded', event => {
  const timing = performance.getEntriesByType('navigation')[0]
  console.log(timing.domInteractive)
  console.log(timing.fetchStart)
  const diff = timing.domInteractive - timing.fetchStart
  console.log(`TTI: ${diff}`)
})

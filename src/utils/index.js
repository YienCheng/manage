const nowDate = new Date()

/**
 * 获取当地时区
 */
export const LocalTimeZone = nowDate.toString().substr(25, 6) + ':' + new Date().toString().substr(31, 2)

/**
 * 获取时间戳
 */
export const LocalTimer = nowDate.getTime()

// 格式化当前日期
export function formatDate (date, layout) {
  // dd-MM-yyyy hh:mm:ss
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let M =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  let y = date.getFullYear() + ''
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let newdate = layout.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s)
  return newdate
}

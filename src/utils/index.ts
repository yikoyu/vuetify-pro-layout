/**
 * 深拷贝
 * @param {Object} obj
 * @return {*}
 */
export const deepCopy = <T extends any = any>(obj: T): T => {
  const target: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      target[key] = deepCopy(obj[key])
    } else {
      target[key] = obj[key]
    }
  }
  return target
}

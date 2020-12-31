const IN_BROWSER = typeof window !== 'undefined'
const IS_PROD = process.env.NODE_ENV === 'production'

export { IN_BROWSER, IS_PROD }

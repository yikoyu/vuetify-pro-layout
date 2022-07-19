const TIPTAP_TIP: string = '[vuetify-pro-layout]'

export default class Logger {
  static text(msg: string) {
    return `${TIPTAP_TIP}: ${msg}`
  }

  static warn(msg: string) {
    console.warn(this.text(msg))
  }

  static error(msg: string) {
    console.error(this.text(msg))
  }
}

const div = {
  text: '',
  /**
   * @param {any} value
   */
  set textContent(value) {
    this.text = value
  },
  get textContent() {
    return this.text
  }
}

const document = {
  querySelector(selector) {
    if (selector === '#root') return div
  },
}
// @ts-expect-error
globalThis.document = document

await import('./main.js')

console.log(div.text)

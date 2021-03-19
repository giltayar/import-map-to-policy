import writeAnswer from 'write-answer'

let text = ''
const div = {
  /**
   * @param {any} value
   */
  set textContent(value) {
    text = value
  },
}

const document = {
  querySelector(selector) {
    if (selector === '#root') return div
  },
}
// @ts-expect-error
globalThis.document = document

writeAnswer()

console.log(text)

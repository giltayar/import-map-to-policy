import {theAnswer} from 'answer'
import {writeLog} from '../relative-specifier.js'

writeLog()

export function writeAnswer() {
  //@ts-expect-error
  document.querySelector('#root').textContent += `${theAnswer()}`
}

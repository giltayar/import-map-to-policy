import {theAnswer} from 'answer'
import {writeLog} from '../relative-specifier.js'
import {writeLog as writeLog2} from '../relative-specifier2.js'

writeLog(' with ..')
writeLog2(' with ../2')

export function writeAnswer() {
  //@ts-expect-error
  document.querySelector('#root').textContent += `${theAnswer()}`
}

import {theAnswer} from 'answer'

export function writeAnswer() {
  //@ts-expect-error
  document.querySelector('#root').textContent = `${theAnswer()}`
}

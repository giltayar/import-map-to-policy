import mocha from 'mocha'
const {describe, it} = mocha
import {expect} from 'chai'

import * as m from '../../src/import-map-to-policy.js'

describe('import-map-to-policy (unit)', function () {
  it('should be able to load (you can delete this test once you have others)', async () => {
    expect(m).to.not.be.undefined
  })
})

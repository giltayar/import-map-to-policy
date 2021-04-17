import {describe, it} from 'mocha'
import {expect} from 'chai'
import {importMapObjectToPolicyObject} from '../src/import-map-to-policy.js'

describe('validation (unit)', function () {
  it('should throw an exception if "imports" is not an object', () => {
    expect(() => importMapObjectToPolicyObject({imports: 4})).to.throw(TypeError)
  })

  it('should throw an exception if "scopes" is not an object', () => {
    expect(() => importMapObjectToPolicyObject({scopes: 4})).to.throw(TypeError)
  })

  it('should be valid even if no imports or scopes', () => {
    importMapObjectToPolicyObject({})
  })
})

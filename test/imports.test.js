import {describe, it, before, after} from 'mocha'
import {expect} from 'chai'
import {executeNodeResult} from './infra/execute-node-result.js'
import {executeBrowserResult, startBrowser, closeBrowser} from './infra/execute-browser-result.js'

describe('"imports" section in import map', function () {
  before(startBrowser)
  after(closeBrowser)

  it('should work on a relative specifier', async () => {
    expect(await executeNodeResult('imports-1')).to.eql(await executeBrowserResult('imports-1'))
  })
})

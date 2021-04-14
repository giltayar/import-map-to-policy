import {describe, it, before, after} from 'mocha'
import {expect} from 'chai'
import {executeNodeResult} from './infra/execute-node-result.js'
import {
  executeBrowserResult,
  startBrowser,
  closeBrowser,
  showHtmlPage,
} from './infra/execute-browser-result.js'

describe('"imports" section in import map', function () {
  before(startBrowser)
  after(closeBrowser)

  it('import relative specifier', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'index.mjs', 'importmap.json']

    const nodeResult = await executeNodeResult(...test)
    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)

    expect(nodeResult).to.eql(browserResult)
  })

  it('import relative specifier with query parameters', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'queryparams.mjs', 'queryparams.importmap.json']

    const nodeResult = await executeNodeResult(...test)
    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)

    expect(nodeResult).to.eql(browserResult)
  })

  /*
   * This does not work in Node && the browser
   */
  it.skip('import relative specifier with query but no query in importmap', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'queryparams.mjs', 'importmap.json']

    const nodeResult = await executeNodeResult(...test)
    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)

    expect(nodeResult).to.eql(browserResult)
  })

  it('import relative specifier with hash', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'hash.mjs', 'hash.importmap.json']

    const nodeResult = await executeNodeResult(...test)
    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)

    expect(nodeResult).to.eql(browserResult)
  })

  /*
   * This does not work in Node && the browser
   */
  it.skip('import relative specifier with hash but no hash in importmap', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'hash.mjs', 'importmap.json']

    const nodeResult = await executeNodeResult(...test)
    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)

    expect(nodeResult).to.eql(browserResult)
  })
})

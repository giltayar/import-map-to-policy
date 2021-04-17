import {describe, it, before, after} from 'mocha'
import {expect} from 'chai'
import {executeNodeResult} from './infra/execute-node-result.js'
import {executeBrowserResult, startBrowser, closeBrowser} from './infra/execute-browser-result.js'

describe('"imports" section in import map', function () {
  before(startBrowser)
  after(closeBrowser)

  it('import relative specifier', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'index.mjs', 'importmap.json']

    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })

  it('import relative specifier with query parameters', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'queryparams.mjs', 'queryparams.importmap.json']

    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })

  /*
   * This does not work in Node && the browser
   */
  it.skip('import relative specifier with query but no query in importmap', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'queryparams.mjs', 'importmap.json']

    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })

  it('import relative specifier with hash', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'hash.mjs', 'hash.importmap.json']

    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })

  /*
   * This does not work in Node && the browser
   */
  it.skip('import relative specifier with hash but no hash in importmap', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'hash.mjs', 'importmap.json']

    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })

  /*
   * This works in the browser but not in Node.
   */
  it.skip('import relative specifier when import map has a slash-ending wildcard', async () => {
    /**@type {[string, string, string]} */
    const test = ['imports-1', 'index.mjs', 'slash-ending.importmap.json']

    // showHtmlPage()
    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })
})

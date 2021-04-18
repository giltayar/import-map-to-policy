import {describe, it, before, after} from 'mocha'
import {expect} from 'chai'
import {executeNodeResult} from './infra/execute-node-result.js'
import {executeBrowserResult, startBrowser, closeBrowser} from './infra/execute-browser-result.js'

describe('"imports" section in import map', function () {
  before(startBrowser)
  after(closeBrowser)

  it('import relative specifier', async () => {
    /**@type {[string, string, string]} */
    const test = ['relative-specifier', 'index.mjs', 'importmap.json']

    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })

  it('import relative specifier with query parameters', async () => {
    /**@type {[string, string, string]} */
    const test = ['relative-specifier', 'queryparams.mjs', 'queryparams.importmap.json']

    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })

  it('import relative specifier with hash', async () => {
    /**@type {[string, string, string]} */
    const test = ['relative-specifier', 'hash.mjs', 'hash.importmap.json']

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
    const test = ['relative-specifier', 'index.mjs', 'slash-ending.importmap.json']

    // showHtmlPage()
    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)

    expect(nodeResult).to.eql(browserResult)
  })

  it.skip('import bare specifiers', async () => {
    /**@type {[string, string, string]} */
    const test = ['bare', 'index.mjs', 'importmap.json']

    // showHtmlPage()
    const browserResult = await executeBrowserResult(...test)
    console.log(browserResult)
    const nodeResult = await executeNodeResult(...test)
    console.log(nodeResult)

    expect(nodeResult).to.eql(browserResult)
  })
})

import mocha from 'mocha'
const {describe, it} = mocha
import {expect, use} from 'chai'
import execa from 'execa'
import chaiAsPromised from 'chai-as-promised'
import path from 'path'
use(chaiAsPromised)

const __dirname = new URL('.', import.meta.url).pathname

describe('import-map-tryout (integ)', function () {
  /**
   * @param {string} fixture
   * @param {string[]} more
   */
  function fixture(fixture, ...more) {
    return path.resolve(__dirname, `fixtures`, fixture, ...more)
  }

  it('should fail with error with no policy is found and a module is not found', async () => {
    await expect(execa('node', ['index.js'], {cwd: fixture('simple-redirect')})).to.be.rejectedWith(
      /ERR_MODULE_NOT_FOUND.*from\.js/,
    )
  })

  it('should succeed by redirecting an unknown module to a known one', async () => {
    expect(
      (
        await execa(
          'node',
          ['--experimental-policy', fixture('simple-redirect/policy.json'), 'index.js'],
          {
            cwd: fixture('simple-redirect'),
          },
        )
      ).stdout,
    ).to.eql(['mode_modules index.js', 'to2', 'to', 'index'].join('\n'))
  })
})

import {promises as fs} from 'fs'
import fastify from 'fastify'
import path from 'path'
import puppeteer from 'puppeteer'
import {fileURLToPath} from 'url'
import {promisify} from 'util'
import {execFile} from 'child_process'
import {copyFixtureDirectory} from './copy-fixture.js'

// @ts-expect-error
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const logImportFileContent = await fs.readFile(path.join(__dirname, 'log-import.js'), 'utf8')
const templateFileContent = await fs.readFile(path.join(__dirname, 'template.html'), 'utf8')

/** @type {puppeteer.Browser|undefined} */
let browser

export async function startBrowser() {
  browser = await puppeteer.launch()
}

export async function closeBrowser() {
  await browser?.close()
}

let shouldShowHtmlPage = false
export function showHtmlPage() {
  shouldShowHtmlPage = true
}
/**
 * @param {string} fixtureDirectory
 * @param {string} entryFile
 * @param {string} importMapFile
 */
export async function executeBrowserResult(
  fixtureDirectory,
  entryFile = 'index.mjs',
  importMapFile = 'importmap.json',
) {
  if (!browser) throw new Error('you forgot to call "startBrowser')
  const absoluteFixtureDirectory = path.resolve(__dirname, '../fixtures', fixtureDirectory)
  const entryFileContent = await fs.readFile(path.join(absoluteFixtureDirectory, entryFile), 'utf8')
  const importMapFileContent = await fs.readFile(
    path.join(absoluteFixtureDirectory, importMapFile),
    'utf-8',
  )
  const newDir = await copyFixtureDirectory(
    path.resolve(__dirname, '../fixtures', fixtureDirectory),
  )

  await fs.writeFile(
    path.join(newDir, '/index.html'),
    templateFileContent
      .replace('IMPORTMAP_PLACEHOLDER', importMapFileContent)
      .replace('ENTRY_SCRIPT_PLACEHOLDER', entryFileContent)
      .replace('LOG_IMPORTS_SCRIPT_PLACEHOLDER', logImportFileContent),
  )

  const app = fastify()
  app.register((await import('fastify-static')).default, {root: newDir})
  const baseUrl = await app.listen(0)
  const entryUrl = new URL('index.html', baseUrl).href

  if (shouldShowHtmlPage) {
    await promisify(execFile)('open', [entryUrl])
    await new Promise((r) => setTimeout(r, 10000000))
  }

  try {
    const page = await browser.newPage()
    try {
      await page.goto(entryUrl)
      return JSON.parse(
        (await page.evaluate(() => document.querySelector('#result')?.textContent)) ?? 'null',
      )
    } finally {
      await page.close()
    }
  } finally {
    app.close().then(() => 1, console.error)
  }
}

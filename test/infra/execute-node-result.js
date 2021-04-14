import {promises as fs} from 'fs'
import {execFile} from 'child_process'
import path from 'path'
import {fileURLToPath} from 'url'
import {promisify} from 'util'
import {importMapObjectToPolicyObject} from '../../src/import-map-to-policy.js'
import {copyFixtureDirectory} from './copy-fixture.js'

// @ts-expect-error
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const logImportFileContent = await fs.readFile(path.join(__dirname, 'log-import.js'), 'utf8')
const templateFileContent = await fs.readFile(path.join(__dirname, 'template.js'), 'utf8')

/**
 * @param {string} fixtureDirectory
 * @param {string} importFile
 * @param {string} entryFile
 */
export async function executeNodeResult(
  fixtureDirectory,
  importFile = 'importmap.json',
  entryFile = 'index.mjs',
) {
  const absoluteFixtureDirectory = path.resolve(__dirname, '../fixtures', fixtureDirectory)
  const entryFileContent = await fs.readFile(path.join(absoluteFixtureDirectory, entryFile), 'utf8')
  const newDir = await copyFixtureDirectory(
    path.resolve(__dirname, '../fixtures', fixtureDirectory),
  )
  const policyFile = path.join(newDir, 'policy.json')
  const finalEntryFile = path.join(newDir, entryFile)

  await fs.writeFile(
    finalEntryFile,
    templateFileContent
      .replace('LOG_IMPORTS_SCRIPT_PLACEHOLDER', logImportFileContent)
      .replace('ENTRY_SCRIPT_PLACEHOLDER', entryFileContent),
  )

  await fs.writeFile(
    policyFile,
    JSON.stringify(
      importMapObjectToPolicyObject(
        JSON.parse(await fs.readFile(path.join(absoluteFixtureDirectory, importFile), 'utf-8')),
      ),
    ),
  )
  console.log(
    'trying with this command: cd',
    newDir,
    '&&',
    process.env.NODE_PATH ?? 'node',
    '--no-warnings',
    '--experimental-policy',
    'policy.json',
    entryFile,
  )
  const resultOutput = await promisify(execFile)(
    process.env.NODE_PATH ?? 'node',
    ['--no-warnings', '--experimental-policy', 'policy.json', entryFile],
    {cwd: newDir},
  )

  try {
    const imports = /**@type {string[]}*/ (JSON.parse(resultOutput.stdout))

    return imports.map((i) => '/' + path.relative(newDir, i))
  } catch (error) {
    if (error instanceof SyntaxError) {
      return resultOutput.stdout + '\n' + resultOutput.stderr
    } else {
      throw error
    }
  }
}

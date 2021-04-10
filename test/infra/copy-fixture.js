import fs from 'fs'
import os from 'os'
import path from 'path'
//@ts-expect-error
// eslint-disable-next-line node/no-missing-import
import stream from 'stream/promises'

/**
 * @param {string | undefined} [dirToCopy]
 * @param {Record<string, string>} [stringSubstitutions]
 * @returns {Promise<string>}
 */
export async function copyFixtureDirectory(dirToCopy, stringSubstitutions) {
  const ret = await fs.promises.mkdtemp(os.tmpdir() + '/')

  if (dirToCopy != null) {
    await copyDirectory(dirToCopy, ret, stringSubstitutions)
  }

  return ret
}

/**
 * @param {string} sourceDirectory
 * @param {string} targetDirectory
 * @param {Record<string, string> | undefined} [stringSubstitutions]
 */
async function copyDirectory(sourceDirectory, targetDirectory, stringSubstitutions) {
  await fs.promises.mkdir(targetDirectory, {recursive: true})

  const filesAndDirs = await fs.promises.readdir(sourceDirectory, {withFileTypes: true})

  await Promise.all(
    filesAndDirs.map((f) =>
      f.isDirectory()
        ? copyDirectory(path.join(sourceDirectory, f.name), path.join(targetDirectory, f.name))
        : copyFile(
            path.join(sourceDirectory, f.name),
            path.join(targetDirectory, f.name),
            stringSubstitutions,
          ),
    ),
  )
}

/**
 * @param {string} sourceFile
 * @param {string} targetFile
 * @param {Record<string, string> | undefined} stringSubstitutions
 */
async function copyFile(sourceFile, targetFile, stringSubstitutions) {
  if (!stringSubstitutions || Object.keys(stringSubstitutions).length === 0) {
    await stream.pipeline(fs.createReadStream(sourceFile), fs.createWriteStream(targetFile))
  } else {
    const source = await fs.promises.readFile(sourceFile, 'utf8')

    const transformed = Object.entries(stringSubstitutions).reduce(
      (acc, [from, to]) => acc.replaceAll(from, to),
      source,
    )

    await fs.promises.writeFile(targetFile, transformed)
  }
}

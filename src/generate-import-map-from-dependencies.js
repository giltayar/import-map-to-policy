/* eslint-disable node/no-unpublished-import */
import {
  getImportMapFromNodeModules,
  generateImportMapForProject,
// @ts-ignore
} from '@jsenv/node-module-import-map'

const projectDirectoryUrl = new URL('..', import.meta.url)

await generateImportMapForProject(
  [
    getImportMapFromNodeModules({
      projectDirectoryUrl,
    }),
  ],
  {
    projectDirectoryUrl,
    importMapFileRelativeUrl: './project.importmap.json',
  },
)

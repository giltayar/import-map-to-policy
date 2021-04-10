/** @type {(string | null)[]} */
// @ts-expect-error
globalThis.__log_imports = globalThis.__log_imports ?? []

/**
 * @param {string} importMetaUrl
 */
globalThis.logImport = function logImport(importMetaUrl) {
  globalThis.__log_imports.push(new URL(importMetaUrl).pathname)
}

globalThis.getLogImports = function getLogImports() {
  return [...globalThis.__log_imports]
}

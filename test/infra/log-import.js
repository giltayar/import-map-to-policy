/** @type {(string | null)[]} */
// @ts-expect-error
globalThis.__log_imports = globalThis.__log_imports ?? []

/**
 * @param {string} importMetaUrl
 */
globalThis.logImport = function logImport(importMetaUrl) {
  const url = new URL(importMetaUrl)
  globalThis.__log_imports.push(url.pathname + url.search + url.hash)
}

globalThis.getLogImports = function getLogImports() {
  return [...globalThis.__log_imports]
}

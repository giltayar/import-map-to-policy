/**
 * @param {any} importMap
 * @returns {object}
 */
export function importMapObjectToPolicyObject(importMap) {
  validateImportMap(importMap)
  return {
    resources: {},
    scopes: {
      'file:': {
        cascade: true,
        integrity: true,
      },
      './': {
        integrity: true,
        cascade: true,
        dependencies: {
          ...importMap.imports,
        },
      },
      ...(importMap.scopes &&
        Object.fromEntries(Object.entries(importMap.scopes).map(importMapScopeToPolicyScope))),
    },
  }
}

/**
 * @param {any} importMap
 */
function validateImportMap(importMap) {
  if (typeof importMap !== 'object') throw new TypeError('importmap should be an object')

  const imports = importMap.imports
  if (imports !== undefined && typeof imports !== 'object')
    throw new TypeError('"imports" should be an object')

  const scopes = importMap.scopes
  if (scopes !== undefined && typeof scopes !== 'object')
    throw new TypeError('"scopes" should be an object')
}

/**
 * @param {[string, string]} scopeEntry
 */
function importMapScopeToPolicyScope([scopePrefix, imports]) {
  return [
    scopePrefix,
    {
      integrity: true,
      cascade: true,
      dependencies: imports,
    },
  ]
}

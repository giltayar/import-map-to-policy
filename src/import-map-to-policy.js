/**
 * @param {object} importMap
 * @returns {object}
 */
export function importMapObjectToPolicyObject(importMap) {
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
        dependencies: {...importMap.imports},
      },
    },
  }
}
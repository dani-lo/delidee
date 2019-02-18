const _GLOBAL = {
  PUSH_INTERVAL: false
}

const setAppGlobal = (key, val) => {
  _GLOBAL[key] = val
}

const getAppGlobal = (key) => {
  return _GLOBAL[key]
}

export {
  setAppGlobal,
  getAppGlobal
}
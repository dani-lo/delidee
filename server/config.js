const u         = 'dalifast-dev'
const p         = 'del1pass'
const menu      = 'siam.js'
const pushKey   = 'api3j7tpkg5icyjuiwkhe445sudfh7'

exports.MENU_FILE         = menu
exports.PUSH_KEY          = pushKey
exports.DB_CONNECTION_STR = (mode) => {
  const dbName    = mode === 'p' ? 'delidee' : 'delifast-dev'
  const uName     = mode === 'p' ? 'udeli' : 'dalifast-dev'
  const uPass     = mode === 'p' ? 'm00pK2_' : 'del1pass'
  const sName     = mode === 'p' ? 'ds357955.mlab.com:57955' : 'ds161724.mlab.com:61724'

  return `mongodb://${ uName }:${ uPass }@${ sName }/${ dbName }`
}

exports.SHOPS = {
  siamcafe: {
    menu: 'siam.js',
    sid: 1001
  }
}
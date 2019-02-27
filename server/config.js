const u         = 'dalifast-dev'
const p         = 'del1pass'
const menu      = 'siam.js'
const pushKey   = 'api3j7tpkg5icyjuiwkhe445sudfh7'

exports.MENU_FILE         = menu
exports.PUSH_KEY          = pushKey
exports.DB_CONNECTION_STR = (env) => {
  const dbName   = env.MODE === 'p' ? 'delifast' : 'delifast-dev'

  return `mongodb://${ u }:${ p }@ds161724.mlab.com:61724/${ dbName }`
}

const { reqResult } = require('../../util')

const validatePostRegister = (req) => {

  if (!req.body) {
    return reqResult('error', 'request body is malformed')
  }
  if(!req.body.name) {
    return reqResult('error', 'name is missing')
  }

  return reqResult('success', 'ok')
}

const validatePostLogin = (req) => {
  if (!req.body) {
    return reqResult('error', 'request body is malformed')
  }
  if(!req.body.name) {
    return reqResult('error', 'name is missing')
  }

  return reqResult('success', 'ok')
}

const validatePostAddress = (req) => {
  if (!req.body) {
    return reqResult('error', 'request body is malformed')
  }
  if(!req.body.address & !req.body.address) {
    return reqResult('error', 'no address data')
  }

  return reqResult('success', 'ok')
}

module.exports = {
  validatePostRegister,
  validatePostLogin,
  validatePostAddress
}
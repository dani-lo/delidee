const { reqResult } = require('../../util')

const validatePostOrder = (req) => {
  return reqResult('success', 'ok')

  if (!req.body) {
    return reqResult('error', 'request body is malformed')
  }
  if(!req.body.items) {
    return reqResult('error', 'items are missing')
  }
  if(!req.body.address) {
    return reqResult('error', 'address are missing')
  }
  if(!req.body.latlon) {
    return reqResult('error', 'latlon is missing')
  }
  if(!req.body.uid) {
    return reqResult('error', 'user is missing')
  }

  return reqResult('success', 'ok')
}

module.exports = {
  validatePostOrder
}
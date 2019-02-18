import { ACTIONS }  from '../constants'

const defaultState = {
  _id: null,
  userName        : null,
  firstName       : null,
  secondName      : null,
  addressLineOne  : null,
  addressLineTwo  : null,
  latlon          : null,
  tel             : null,
  edit: {},
  error: null
}

export default function accountReducer (state = defaultState, action) {
  switch (action.type) {
    case ACTIONS.USER_LOGGEDIN :
      
      if (action.payload.data && action.payload.data._id && action.payload.data._id.length) {
        
        return Object.assign({}, state, action.payload.data, { loggedin: true, error: null } )
      } 
      return Object.assign({}, state, {error: 'Something went wrong with your login', loggedin: false})
    
    case ACTIONS.CURRENT_USER_LOADED :

      if (action.payload.data && action.payload.data._id) {

        return Object.assign({}, state, action.payload.data, { loggedin: false, error: null } )
      } 

      return Object.assign({}, state,  { loggedin: false, error: null } )
    
    case ACTIONS.USER_REGISTERED :
      console.log('registered reduc', action.payload.data)
      console.log(Object.assign({}, state, action.payload.data, {error: null} ))
      return Object.assign({}, state, action.payload.data, {error: null} )

    case ACTIONS.USER_UPDATED :

      return Object.assign({}, state, action.payload.data, {loggedin: true, error: null} )

    case ACTIONS.ADDRESS_EDIT :

      return Object.assign({}, state, action.payload.data, {error: null}) 

    default :
      return state
  }
}
import { ACTIONS }  from '../constants'

const defaultState = {
  _id: null,
  waiting         : true,
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
    case ACTIONS.USER_STARTED :

      return Object.assign({}, state, {waiting: false}) 

    case ACTIONS.USER_LOGGEDIN :
      
      if (action.payload.data && action.payload.data._id && action.payload.data._id.length) {
        
        return Object.assign({}, state, action.payload.data, { waiting: false, loggedin: true, error: null } )
      } 
      return Object.assign({}, state, {error: 'Something went wrong with your login', loggedin: false, waiting: false})
    
    case ACTIONS.CURRENT_USER_LOADED :

      if (action.payload.data && action.payload.data._id) {

        return Object.assign({}, state, action.payload.data, { loggedin: false, waiting: false, error: null } )
      } 

      return Object.assign({}, state,  { loggedin: false, error: null } )
    
    case ACTIONS.USER_REGISTERED :

      return Object.assign({}, state, action.payload.data, {error: null, waiting: false} )

    case ACTIONS.USER_UPDATED :

      return Object.assign({}, state, action.payload.data, {loggedin: true, error: null, waiting: false} )

    case ACTIONS.ADDRESS_EDIT :

      return Object.assign({}, state, action.payload.data, {error: null, waiting: false}) 

    case ACTIONS.USER_DESTROY :

      return Object.assign({}, defaultState, {waiting: false}) 

    default :
      return state
  }
}
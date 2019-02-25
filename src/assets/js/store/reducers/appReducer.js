import { ACTIONS }  from '../constants'

const defaultState = {  
  editUser: false,
  shopmode: false,
  confirm: null,
  flash: {
    message: null,
    className: null
  },
  loading: {
    status: false,
    message: null
  }
}

export default function appReducer (state = defaultState, action) {
  switch (action.type) {

    case ACTIONS.FLASH_MESSAGE :

      return Object.assign({}, state, { flash: action.payload })

    case ACTIONS.UNFLASH_MESSAGE :

      const noFlash = {
        message: null,
        className: null
      }

      return Object.assign({}, state, { flash: noFlash })
    
    case ACTIONS.CONFIRM : 
      
      return Object.assign({}, state, { confirm: action.payload})

    case ACTIONS.IS_LOADING :
      return Object.assign({}, state, { loading: {status: true }})

    case ACTIONS.EDIT_USER : 
      return Object.assign({}, state, { editUser: true }) 

    case ACTIONS.UNEDIT_USER : 
      return Object.assign({}, state, { editUser: false }) 
    
    case ACTIONS.SHOW_ORDER : 
      const orderId = action.payload 

      return Object.assign({}, state, { showOrder: orderId })  
    
    case ACTIONS.HIDE_ORDER : 

      return Object.assign({}, state, { showOrder: false })  
      
    default :
      return state
  }
}
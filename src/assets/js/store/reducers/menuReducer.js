import { ACTIONS }  from '../constants'

export default function menuReducer (state = null, action) {
  switch (action.type) {
    case ACTIONS.MENU_LOADED:
      const menu = action.payload.data
      return Object.assign({}, menu)
    default :
      return state
  }
}
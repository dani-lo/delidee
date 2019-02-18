import { ACTIONS }  from '../constants'


export function appHasErrored(bool) {
    return {
        type: ACTIONS.HAS_ERROR,
        hasErrored: bool
    }
}
export function appIsLoading(bool) {
    return {
        type: ACTIONS.IS_LOADING,
        isLoading: bool
    }
}

export function appFlashMessage (message, className) {

  return {
    type: ACTIONS.FLASH_MESSAGE,
    payload: {
      message,
      className
    }
  }
}

export function editUser () {
    return {
        type: ACTIONS.EDIT_USER,
        payload: null
    }
}

export function uneditUser () {
    return {
        type: ACTIONS.UNEDIT_USER,
        payload: null
    }
}

export function showOrder (oId) {
    return {
        type    : ACTIONS.SHOW_ORDER,
        payload : oId
    }
}

export function hideOrder () {
    return {
        type    : ACTIONS.HIDE_ORDER,
        payload : null
    }
}
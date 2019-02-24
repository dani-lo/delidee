import { ACTIONS }      from '../constants'
import { fetch }        from 'whatwg-fetch'
import { uneditUser}    from './appActions'
import { shopToken }    from '../../helper'
import { notify }       from './appActions'

const postHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function userLoggedin (data) {
    return {
        type    : ACTIONS.USER_LOGGEDIN,
        payload : data
    }
}

function currentUserLoaded (data) {
    return {
        type    : ACTIONS.CURRENT_USER_LOADED,
        payload : data
    }
}

function addressChanged (data) {
    return {
        type    : ACTIONS.ADDRESS_CHANGED,
        payload : data
    }
}

function userRegistered (data) {
    return {
        type    : ACTIONS.USER_REGISTERED,
        payload : data
    }
}

function userUpdated (data) {
    return {
        type    : ACTIONS.USER_UPDATED,
        payload : data
    }
}

export function destroyUser () {
    const endpoint = '/api/user/logout'

    fetch(endpoint)
    
    return {
        type    : ACTIONS.USER_DESTROY,
        payload : null
    }
}

export function fetchCurrentUser () {
    const endpoint = '/api/user/current'

    return (dispatch) => {
        fetch(endpoint)
        .then((response) => response.json())
        .then((response) => {
            dispatch(currentUserLoaded(response))
        })
        
    }
}

export function postLogin (userName) {
    const endpoint      = '/api/user/login'
    const postOptions   = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify({userName: userName})
    }

    return (dispatch) => {
        fetch(endpoint, postOptions)
        .then((response) => response.json())
        .then((response) => {
            if (response.data && response.data.token) {
                shopToken(response.data.token)
            }

            if (response.status && response.status === 'error') {
                dispatch(notify('Error Loggin In', 'error'))
            } else {
                dispatch(userLoggedin(response))
            }
            
        })
        .catch((err) => {
            dispatch(notify('Error Loggin In', 'error'))
        })
    }
}

export function addUser (userData) {
    const endpoint      = '/api/user/register'
    const postOptions   = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify(userData)
    }

    return (dispatch) => {
        fetch(endpoint, postOptions)
        .then((response) => response.json())
        .then((response) => {
            dispatch(userRegistered(response))
        })
    }
}


export function updateUser (userData) {
    const endpoint      = '/api/user/edit'
    const postOptions   = {
        method: 'PUT',
        headers: postHeaders,
        body: JSON.stringify(userData)
    }

    return (dispatch) => {
        fetch(endpoint, postOptions)
        .then((response) => response.json())
        .then((response) => {
            dispatch(userUpdated(response))
            dispatch(uneditUser())
        })
    }
  }
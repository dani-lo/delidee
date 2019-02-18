import { ACTIONS }  from '../constants'
import { fetch }    from 'whatwg-fetch'

const postHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export function menuLoaded(data) {
    return {
        type    : ACTIONS.MENU_LOADED,
        payload : data
    }
}


export function fetchMenu () {
    const endpoint = '/api/menu'

    return (dispatch) => {
        fetch(endpoint)
        .then((response) => response.json())
        .then((response) => {
            dispatch(menuLoaded(response))
        })
    }
}
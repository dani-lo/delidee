import React                  from 'react'
import { withRouter }         from "react-router-dom"
import { connect }            from 'react-redux'

import { deleteShopToken }    from '../../helper'

import { DFSubTitle,
         DFInput,
         DFContainer,
         DFSelect,
         DFButton,
         DFInputsField,
         DFLabel}              from '../../elements/library'
import APP_CONFIG              from '../../config'

import { notify }              from '../../store/actions/appActions'
import { destroyUser }         from '../../store/actions/accountActions'


const currentShop = APP_CONFIG.SHOP_ID

const LogoutComponent = (props) => {

  const shopLogout = () => {
    deleteShopToken()
    props.destroyUser()
    props.notify('Bye Bye', 'info')

    props.history.push(`/${ currentShop }`)
  }

  if (props.bare) {
    return <DFButton className="margin-left-s block-btn" onClick={ () => shopLogout() }>logout</DFButton>  
  }

  return  <DFContainer className="logout">
    <DFButton onClick={ () => shopLogout() }>logout</DFButton>    
    </DFContainer>
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
  destroyUser: () => dispatch(destroyUser()),
  notify : (txt, className) => dispatch(notify(txt, className))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutComponent))
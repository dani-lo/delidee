import React, { PureComponent, Fragment }   from 'react'
import { connect }                          from 'react-redux'

import { shopToken }                        from '../helper'
import { DFPageContainer, 
         DFContainer,
         DFBlock,
         DFInputsField,
         DFButton }                         from '../elements/library'
import { editUser }                         from '../store/actions/appActions'
import { startUser }                        from '../store/actions/accountActions'


import ShowUserComponent                    from '../components/user/ShowUser.jsx'
import EditUserComponent                    from '../components/user/EditUser.jsx'
import RegistrationComponent                from '../components/user/Register.jsx'
import LogoutComponent                      from '../components/user/Logout.jsx'

import { MAP_MODES }                        from '../components/map/Map.jsx'

import APP_CONFIG                           from '../config'

const currentShop = APP_CONFIG.SHOP_ID

class AccountContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount () {

    if (this.props.user && this.props.user.waiting) {
      setTimeout(() => this.props.startUser(), 1000)
    }
    
  }

  render () {
    
    const token = shopToken()

    if (token) {
      this.props.history.push(`/${ currentShop }/shop`)

      return null
    }

    const showRegistration = !this.props.user || !this.props.user._id
    const editUser         = this.props.app && this.props.app.editUser
    const showUser         = this.props.user && this.props.user._id && !editUser

    if (this.props.user.waiting) {
      return <div></div>
    }

    return (<DFPageContainer className="account-page">
      { showRegistration  ? 
        <RegistrationComponent /> 
        : null 
      }
      { editUser        ?
        <EditUserComponent /> : null 
      }
      { showUser          ? 
        <Fragment>
          
          <ShowUserComponent 
            latlon         = { this.props.user.latlon } 
            maptext        = "Account Location"
          /> 
        </Fragment> : null 
      }
      { showUser        ?
        <DFBlock className="margin-v-l">
        <DFInputsField>
          <DFButton onClick={ () => this.props.editUser() }>Edit Account</DFButton>
          <LogoutComponent bare />
        </DFInputsField> 
        </DFBlock> : null
      }
    </DFPageContainer>)
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        app : state.app
    }
}

const mapDispatchToProps = dispatch => ({
  editUser  : () => dispatch(editUser()),
  startUser : () => dispatch(startUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
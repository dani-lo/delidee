import React, { PureComponent }             from 'react'
import { connect }                          from 'react-redux'

import { DFPageContainer, 
         DFContainer,
         DFInputsField,
         DFButton,
         DFPageTitle }                      from '../elements/library'
import { editUser }                         from '../store/actions/appActions'

import ShowUserComponent                    from '../components/user/ShowUser.jsx'
import EditUserComponent                    from '../components/user/EditUser.jsx'
import RegistrationComponent                from '../components/user/Register.jsx'

import { MAP_MODES }                        from '../components/map/Map.jsx'


class AccountContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  render () {

    const showRegistration = !this.props.user || !this.props.user._id
    const editUser         = this.props.app && this.props.app.editUser
    const showUser         = this.props.user && this.props.user._id && !editUser

    return (<DFPageContainer>
      { showRegistration  ? 
        <RegistrationComponent /> 
        : null 
      }
      { editUser        ?
        <EditUserComponent /> : null 
      }
      { showUser          ? 
        <ShowUserComponent 
          latlon         = { this.props.user.latlon } 
          maptext        = "Accoiunt Location"
        /> : null 
      }
      { showUser        ?
        <DFContainer>
          <DFInputsField>
            <DFButton onClick={ () => this.props.editUser() }>Edit Account</DFButton>
          </DFInputsField>
        </DFContainer> : null
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
  editUser  : () => dispatch(editUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
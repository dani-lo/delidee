import React, { PureComponent }     from 'react'
import { withRouter }               from 'react-router-dom'

import { connect }                  from 'react-redux'

import APP_CONFIG                   from '../../config'

import { DFContainer, DFButton, 
         DFIcon, DFBlock, 
         DFSubTitle }               from '../../elements/library'
import { fetchCurrentUser }         from '../../store/actions/accountActions'

import LoginComponent               from './Login.jsx'

const currentShop       = APP_CONFIG.SHOP_ID
const GoToAccountButton =  withRouter(({ history }) => (
  <DFIcon 
    clickable 
    className="fas fa-user" 
    onClick={() => history.push(`/${ currentShop }/account`) } 
  />
))

class CurrentuserComponent extends PureComponent {

  componentDidMount () {
    this.props.getUser()
  }

  render () {
    
    const { user } = this.props

    if (user && user._id) {
      return <DFContainer>
        <GoToAccountButton />
      </DFContainer>
    }

    return <LoginComponent />
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = dispatch => ({getUser: () => dispatch(fetchCurrentUser())})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentuserComponent)
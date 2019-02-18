import React, { PureComponent }   from 'react'
import { withRouter }             from 'react-router-dom'

import { connect }                          from 'react-redux'

import { DFContainer, DFButton, DFInput }   from '../../elements/library'
import { fetchCurrentUser }                 from '../../store/actions/accountActions'

import LoginComponent                       from './Login.jsx'

class CurrentuserComponent extends PureComponent {

  componentDidMount () {
    this.props.getUser()
  }

  render () {
    
    const { user } = this.props

    if (user && user._id) {
      return <DFContainer id="currentuser"><p>You are Signed In as {`${ user.userName}`}</p></DFContainer>
    }
 
    const GoToAccountButton =  withRouter(({ history }) => (
      <DFButton onClick={() => history.push('/account') }>go to registration</DFButton>
    ))

    return (<DFContainer id="currentuser">
      <h3>You need to register</h3>
      <p>(we only neeed your email and address details for delivery)</p>  
      <GoToAccountButton />
      <h3>Or Login</h3>
      <LoginComponent />
    </DFContainer>)
    
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = dispatch => ({getUser: () => dispatch(fetchCurrentUser())})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentuserComponent)
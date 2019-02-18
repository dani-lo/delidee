import React, { PureComponent }   from 'react'

import { DFContainer, DFButton, DFInput }   from '../../elements/library'
import { connect }                          from 'react-redux'
import { postLogin }                        from '../../store/actions/accountActions'

class LoginComponent extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      userName: null
    }
  }

  submitLogin () {
    if (!this.state.userName) {
      return false
    }

    this.props.login(this.state.userName)
  }

  render () {

    return (<div className='delifast-view delifast-login'>
      <DFContainer>
        <DFInput.Txt value={ this.state.userName } onChange={ (e) => this.setState({userName: e.target.value})} />
      </DFContainer>
      <DFContainer>
        <DFButton
          active={ this.userName !== null ? 1 : 0 }
          onClick={ () => this.submitLogin() }
        >
        Submit Login
        </DFButton>
      </DFContainer>
    </div>)
  }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({login: (username) => dispatch(postLogin(username))})

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
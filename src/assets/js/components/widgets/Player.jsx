import React, { PureComponent }   from 'react'
import { connect }                from 'react-redux'


import { shopToken,
         setAppGlobal,
         getAppGlobal }           from '../../helper'

import { confirm, 
         notify }                 from '../../store/actions/appActions'

import ConfirmComponent           from './Confirm.jsx'

const confirmStart = 'Start Management'

class PlayerComponent extends PureComponent {

  componentDidMount () {
    const token       = shopToken()
    const playerRef   = getAppGlobal('DD_PLAYER')

    if (token && !playerRef) {
      this.prepareSound()
      this.props.confirm(confirmStart)
    }
  }

  prepareSound () {
    document.addEventListener('click', () => {

      const ddPlayer = document.getElementById('dd-player')

      if (ddPlayer) {
        ddPlayer.play()
        ddPlayer.pause()

        setAppGlobal('DD_PLAYER', ddPlayer)
      } else {
        this.props.notify('Error! Please Reload', 'ERROR')
      }
    })
  }

  aggressivePrepareSound () {
    this.props.confirm(null)
  }

  render () {
    const confirmComponent = this.props.app.confirm  &&this.props.app.confirm === confirmStart ? <ConfirmComponent
      onCancel  = { () => this.props.confirm(null) }
      onConfirm = { () => this.props.confirm(null) }
      text      = { confirmStart}
    /> : null

    return <span>
      { confirmComponent }
    </span>
  }
}

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = dispatch => ({ 
  confirm             : (txt) => dispatch(confirm(txt)),
  notify              : (txt, className) => dispatch(notify(txt))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComponent)
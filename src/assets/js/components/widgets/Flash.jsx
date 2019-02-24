import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'
import { unNotify }             from '../../store/actions/appActions'

let flashTO = null 

const FlashMessage = (props) => {
  const { flash } = props.app

  if (!flash.message || !flash.className) {
    return null
  }

  if (flashTO) {
    clearTimeout(flashTO)
  }

  flashTO = setTimeout(() => {
    props.unNotify()
  }, 4000)

  return (
    <div className={`app-flash`}>   
      <div className={`flash-container ${ flash.className }`}>
        <p>{ flash.message }</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = dispatch => ({unNotify: () => dispatch(unNotify())})

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);  
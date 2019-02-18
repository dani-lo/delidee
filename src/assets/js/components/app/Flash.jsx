import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'

class FlashMessage extends PureComponent{

  render () {

    const { flash } = this.props.app

    if (!flash.message || !flash.className) {
      return null
    }

    return (
      <div className="row">
        <div 
        className={'col-md-12 alert ' + flash.className } 
        role="alert">
          { flash.message }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => {  
  return { app }
}

export default connect(mapStateToProps)(FlashMessage);  
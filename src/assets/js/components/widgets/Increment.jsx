import React from 'react'

const IncrementComponent = (props) => {

  const increase = () => {
    const newVal =  val + 1

    return props.onChange(newVal)
  }

  const decrease = () => {
    const newVal =  val - 1

    return props.onChange(newVal)
  }

  const val = props.value.value

  return <div className="increment-widget">
      <div 
        className={`${val === 1 ? 'unactive' : ''} inc-more inc-button`}
        onClick={ () => decrease() }  
      >
        <span className="inc-display-outer">-</span>
      </div>
      <div className="inc-monitor">
        <span className="inc-display-outer">{ val }</span>
      </div>
      <div 
        className={`${val >= props.limit ? 'unactive' : ''} inc-less inc-button`}
        onClick={ () => increase() }  
      >
        <span className="inc-display-outer">+</span>
      </div>
  </div>
}

export default IncrementComponent
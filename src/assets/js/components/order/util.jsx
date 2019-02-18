import React            from 'react'
import { DFContainer }  from '../../elements/library'

const itemOptions = (options) => {
  
  const multiOption = options && options[1]

  return <DFContainer> {
    
    Object.keys(options).map(k => {
      const opt     = options[k]
      const option  = []

      if (opt.comment) {
        option.push(<div><span>comment: { opt.comment }</span></div>) 
      }
      if (opt.with && opt.with.label) {
        option.push(<div><span>with: { opt.with.label }</span></div>) 
      }
      if (opt.cook && opt.cook.label) {
        option.push(<div><span>cook: { opt.cook.label }</span></div>) 
      }
      if (opt.side && opt.side.label) {
        option.push(<div><span>side: { opt.side.label }</span></div>) 
      }

      if (option.length) {
        if (multiOption) {
          return <div><p>Item { parseInt(k) + 1 }</p>{ option }</div>
        }

        return option.length ? option : null 
      }

      return null
      
    })
  } </DFContainer>
}

export  {
  itemOptions
}
import React, { Fragment }    from 'react'
import { DFContainer }        from '../../elements/library'

const ItemOptions = ({options}) => {
  
  const multiOption = options && options[1]

  return <Fragment> {
    
    Object.keys(options).map(k => {
      const opt     = options[k]
      const option  = []

      if (opt.with && opt.with.label) {
        option.push(<p>with: { opt.with.label }</p>) 
      }
      if (opt.cook && opt.cook.label) {
        option.push(<p>cook: { opt.cook.label }</p>) 
      }
      if (opt.side && opt.side.label) {
        option.push(<p>side: { opt.side.label }</p>) 
      }

      if (opt.comment) {
        option.push(<div className="item-option-comment"><h4>your comment</h4><p>{ opt.comment }</p></div>) 
      }

      if (option.length) {
        if (multiOption) {
          return <div><p>Item { parseInt(k) + 1 }</p>{ option }</div>
        }

        return option.length ? option : null 
      }

      return null
      
    })
  } </Fragment>
}

export  default ItemOptions
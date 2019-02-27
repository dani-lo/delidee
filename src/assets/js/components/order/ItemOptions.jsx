import React, { Fragment }    from 'react'
import { DFContainer }        from '../../elements/library'

const ItemOptions = ({options}) => {
  
  const multiOption = options && options[1]

  return <Fragment> {
    
    Object.keys(options).map(k => {
      const opt     = options[k]
      const option  = []

      if (opt.with && opt.with.label) {
        option.push(<li>with: <span className="opt-content">{ opt.with.label }</span></li>) 
      }
      if (opt.cook && opt.cook.label) {
        option.push(<li>cook: <span className="opt-content">{ opt.cook.label }</span></li>) 
      }
      if (opt.side && opt.side.label) {
        option.push(<li>side: <span className="opt-content">{ opt.side.label  }</span></li>) 
      }

      if (opt.comment) {
        option.push(<li><span className="padding-right-l">comment</span><span className="opt-content">{ opt.comment }</span></li>) 
      }

      if (option.length) {
        if (multiOption) {
          return <div><p>Item { parseInt(k) + 1 }</p><ul className="item-options">{ option }</ul></div>
        }

        return<ul className="item-options">{ option }</ul>
      }

      return null
      
    })
  } </Fragment>
}

export  default ItemOptions
import React, { Fragment }    from 'react'
import { DFContainer }        from '../../elements/library'

const ItemOptions = ({options}) => {
  
  const multiOption = options && options[1]

  return <Fragment> {
    
    Object.keys(options).map((k, i) => {
      const opt     = options[k]
      const option  = []

      if (opt.with && opt.with.label) {
        option.push(<li key={'opt-w-' + i}>with: <span className="opt-content">{ opt.with.label }</span></li>) 
      }
      if (opt.cook && opt.cook.label) {
        option.push(<li key={'opt-c-' + i}>cook: <span className="opt-content">{ opt.cook.label }</span></li>) 
      }
      if (opt.side && opt.side.label) {
        option.push(<li key={'opt-s-' + i}>side: <span className="opt-content">{ opt.side.label  }</span></li>) 
      }

      if (opt.spicy && opt.spicy.label) {
        option.push(<li key={'opt-sp-' + i}>spicy: <span className="opt-content">{ opt.spicy.label }</span></li>) 
      }

      if (opt.bread && opt.bread.label) {
        option.push(<li key={'opt-b-' + i}>bread: <span className="opt-content">{ opt.bread.label }</span></li>) 
      }

      if (opt.extra_shot && opt.extra_shot.label) {
        option.push(<li key={'opt-esst-' + i}>extra shot: <span className="opt-content">{ opt.extra_shot.label } (+{opt.extra_shot.value * 30}THB)</span></li>) 
      }

      if (opt.extra_scoop && opt.extra_scoop.label) {
        option.push(<li key={'opt-escp-' + i}>extra scoop: <span className="opt-content">{ opt.extra_scoop.label } (+{opt.extra_scoop.value * 50}THB)</span></li>) 
      }

      if (opt.comment) {
        option.push(<li key={'opt-cmt-' + i}><span className="padding-right-l">comment</span><span className="opt-content">{ opt.comment }</span></li>) 
      }

      if (option.length) {
        if (multiOption) {
          return <div><p>Item { parseInt(k) + 1 }</p><ul className="item-options">{ option }</ul></div>
        }

        return<ul key={ 'opt-list-' + i } className="item-options">{ option }</ul>
      }

      return null
      
    })
  } </Fragment>
}

export  default ItemOptions
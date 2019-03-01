import React      from 'react'
import ls         from 'local-storage'

const SelectLang = (props) => {

  return <img 
    src={ props.img } 
    className={ props.className || ''}
    onClick={ () => {
      ls('LANG', props.lang)
      if (location && location.reload) {
        location.reload()
      }
    }} 
  />
  // return <a href="#" className={ props.className || ''} onClick={ () => ls('LANG', props.lang) }>{ props.text }</a> 
}

export default SelectLang

import React, { PureComponent } from 'react'
import Select                   from 'react-select'

import ModalComponent           from '../../components/app/Modal.jsx'

import { DFSubTitle,
         DFInput,
         DFContainer,
         DFSelect,
         DFInputsField,
         DFLabel}                from '../../elements/library'

class ItemDetailComponent extends PureComponent {

  constructor (props) {
    super(props)

    const qty   = this.props.qty

    let cState = {
      items: {}
    }

    Array.apply(null, { length: qty }).map((x, i) => {
      cState.items[i] = {
        comment : '',
        with    : null,
        cook    : null,
        side    : null
      }
    })

    this.state = Object.assign({}, cState)
  }

  onChooseWith (i, option) {
    const newStateItems   = Object.assign({}, this.state.items)
    newStateItems[i].with = option.value && option.value !== 0 ? option : null

    this.setState({items: newStateItems})
  }

  onChooseCook (i, option) {
    const newStateItems   = Object.assign({}, this.state.items)
    newStateItems[i].cook = option.value && option.value !== 0 ? option : null

    this.setState({items: newStateItems})
  }

  onChooseSide (i, option) {
    const newStateItems   = Object.assign({}, this.state.items)
    newStateItems[i].side = option.value && option.value !== 0 ? option : null

    this.setState({items: newStateItems})
  }

  onComment (i, comment) {
    const newStateItems       = Object.assign({}, this.state.items)
    newStateItems[i].comment  = comment

    this.setState({items: newStateItems})
  }

  buildUserOptions () {
    
    const pid     = this.props.item 
    const name    = this.props.name
    const qty     = this.props.qty
    const options = this.props.options

    const userOptions = Array.apply(null, { length: qty }).map((x, i) => {
      let selectWith = null
      let selectCook = null
      let selectSide = null

      if (options && options.with) {
        const ingredients = options.with.map((ing) => { 
          return {value: ing, label: ing} 
        })

        ingredients.unshift({ label: 'Please Select', value: 0 })

        selectWith = <DFSelect required= { 1 } filled={ this.state.items[i].with ? 1 : 0 }>
          <Select 
            value     = { this.state.items[i].with ? this.state.items[i].with : ingredients[0] }
            onChange  = { opt => this.onChooseWith(i, opt) }
            options   = { ingredients }
          />
        </DFSelect>
      }

      if (options && options.cook) {
        const cookStyles = options.cook.map((c) => { 
          return {value: c, label: c} 
        })

        cookStyles.unshift({ label: 'Please Select', value: 0 })

        selectCook = <DFSelect>
            <Select 
            value     = { this.state.items[i].cook ? this.state.items[i].cook : cookStyles[0] }
            onChange  = { opt => this.onChooseCook(i, opt) }
            options   = { cookStyles }
          />
        </DFSelect>
      }

      if (options && options.side) {
        const sides = options.side.map((s) => { 
          return {value: s, label: s} 
        })

        sides.unshift({ label: 'Please Select', value: 0 })

        selectSide = <DFSelect required= { 1 } filled={ this.state.items[i].side ? 1 : 0 }>
          <Select 
            value     = { this.state.items[i].side ? this.state.items[i].side : sides[0] }
            onChange  = { opt => this.onChooseSide(i, opt) }
            options   = { sides }
          />
        </DFSelect>
      }

      return <DFContainer key={'menu-detail-' + i}>
            <DFSubTitle>{ name }</DFSubTitle>
            {selectWith ? <DFInputsField>
              <DFLabel>Choose Ingredient</DFLabel>
              { selectWith }
            </DFInputsField> : null}
            {selectSide ? <DFInputsField>
              <DFLabel>Choose Side</DFLabel>
              { selectSide }
            </DFInputsField> : null}
            {selectCook ? <DFInputsField>
              <DFLabel>Choose Cooking Style</DFLabel>
              { selectCook }
            </DFInputsField> : null}
            <DFInputsField>
              <DFLabel>Comments or Special Requests?</DFLabel>
              <DFInput.Txt value={ this.state.items[i].comment } onChange={ (e) => this.onComment(i, e.target.value) } />
            </DFInputsField>
          </DFContainer>

    })

    return userOptions
  }

  isActive () {
    const options = this.props.options || {}
    const qty     = this.props.qty

    let active = true 

    if (options.with) {
      Array.apply(null, { length: qty }).map((x, i) => {
        if (this.state.items[i].with === null) {
          active = false 
        }
      })
    }

    if (options.side) {
      Array.apply(null, { length: qty }).map((x, i) => {
        if (this.state.items[i].side === null) {
          active = false 
        }
      })
    }

    return active
  }

  render () {
    
    return <ModalComponent
          className = "modal"
          unactive  = { !this.isActive() }
          cancel    = { () => this.props.onCancel() } 
          confirm   = { () => this.props.onConfirm(Object.assign({}, this.state.items)) }
        >
      {  this.buildUserOptions() }
    </ModalComponent>
  }
}

export default ItemDetailComponent
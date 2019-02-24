import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'
import Select                   from 'react-select'

import { DFMenuItem, 
         DFButton,
         DFItem }               from '../../elements/library'
import ItemDetailComponent      from '../../components/menu/ItemDetail.jsx'
import IncrementComponent       from '../../components/widgets/Increment.jsx'
import APP_CONFIG               from '../../config'

const itemOrderDefault = {
  pid       : null,
  name      : null,
  price     : null,
  quantity  : null,
  options   : null,
  comment   : null
}

const itemQuantityOptions   = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' }
]

const orderItem = (pid, name, price, options, quantity = 1) => {
  return Object.assign({}, itemOrderDefault, { pid: pid, price: price, subtotal: price * quantity, quantity: quantity, name: name, options: options })
}

class MenuItemComponent extends PureComponent {

  constructor (props) {
    super(props)

    this.state = {
      quantity: null,
      confirm: null
    }
  }

  itemOrdered () {
    const pid               = this.props.pid
    const order             = this.props.order

    const ordered = order.items.find(i => i.pid === pid)
   
    return ordered
  }

  currentQuantity (order, pid) {
    if (this.state.quantity) {
      return itemQuantityOptions.find(opt => opt.value === this.state.quantity)
    }

    if (!order || !order.items || !order.items.length) {
      return itemQuantityOptions[0] 
    }

    const ordered = this.itemOrdered()
    
    if (ordered) {
      return itemQuantityOptions.find(opt => opt.value === ordered.quantity)
    }

    return itemQuantityOptions[0]
  }

  onSelectQuantity (quantity) {
    this.setState({ quantity: quantity })
  }

  onConfirm (userOptions) {

    const pid               = this.props.pid
    const name              = this.props.name
    const price             = this.props.price
    const order             = this.props.order
    const addOrderItem      = this.props.addOrderItem

    const itemPrice         = parseFloat(price).toFixed(2)
    const selectedQuantity  = this.currentQuantity(order, pid)

    addOrderItem(orderItem(pid, name, itemPrice, userOptions, selectedQuantity.value))

    this.setState ({
      confirm: null
    })
  }

  onCancel () {
    this.setState ({
      quantity: null,
      confirm: null
    })
  }

  showConfirmationModal () {
    this.setState({confirm: true})
  }

  renderItemSelection (selectedQuantity) {
    const ordered = this.itemOrdered()
    const pid     = this.props.pid

    if (ordered) {
      return <div className="menu-item-selection">
        <div className="menu-item-quantity">
          <DFButton 
            cancel
            onClick = { () => this.props.removeOrderItem(pid) }
          >Delete from order</DFButton>
        </div>
        
      </div>
    }

    return <div className="menu-item-selection">
      <div className="menu-item-quantity">
        <IncrementComponent
          value     = { selectedQuantity }
          limit     = { itemQuantityOptions.length }
          onChange  = { val => this.onSelectQuantity(val) }
        />
        {/* <Select
          value     = { selectedQuantity }
          onChange  = { opt => this.onSelectQuantity(opt.value) }
          options   = { itemQuantityOptions }
        /> */}
      </div>
      <DFButton 
        onClick = { () => this.showConfirmationModal() }
      >Add to order</DFButton>
    </div>
  }

  render () {
    const pid               = this.props.pid
    const name              = this.props.name
    const price             = this.props.price
    const order             = this.props.order
    const loggedin          = this.props.loggedin
    const options           = this.props.options
    const img               = this.props.img
    const ordered           = this.itemOrdered()
    const itemPrice         = parseFloat(price).toFixed(2)
    const selectedQuantity  = this.currentQuantity(order, pid)
    
    const itemDetail = <ItemDetailComponent 
      qty       = { selectedQuantity.value }
      pid       = { pid }
      name      = { name }
      options   = { options }
      onConfirm = { (userOptions) => this.onConfirm(userOptions) }
      onCancel  = { () => this.onCancel() }
    />

    return <DFMenuItem className="menu-item" ordered={ ordered ? 1 : 0 }>
      { this.state.confirm !== null ? itemDetail : null } 
      <div className="product-detail">
        <DFItem className="low-case title">{ name }</DFItem>
        <p className="price">{ itemPrice } { APP_CONFIG.CURRENCY }</p>
      </div>
      <img src={`/img/menu/${ img }`} />
      <div className="menu-item-order">
        { loggedin ?  this.renderItemSelection(selectedQuantity) : null }
      </div>
    </DFMenuItem>
  }
}

export default MenuItemComponent
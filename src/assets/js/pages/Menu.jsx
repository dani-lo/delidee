import React, { PureComponent }   from 'react'
import { ajax }                   from 'jquery-ajax'
import { connect }                from 'react-redux'

import MenuItemComponent          from '../components/menu/Item.jsx'

import { DFPageContainer,
         DFContainer,
         DFSectionTitle,
         DFSubTitle,
         DFItem, 
         DFButton}                 from '../elements/library'

import { addItem, removeItem }    from '../store/actions/ordersActions'
import { fetchMenu }              from '../store/actions/menuActions'
import { notify }                 from '../store/actions/appActions'

import { shopToken }              from '../helper'
import APP_CONFIG                 from '../config'

const currentShop = APP_CONFIG.SHOP_ID

class MenuContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    
    if (!this.props.menu || !this.props.menu.items) {
      this.props.getMenu()
    }
  }


  renderMenu () {
    const elements = []
    const currentOrder = this.props.orders.current 
    const sections = Object.keys(this.props.menu)
    
    /*
    const csvRows = [
      'product,price,choose ingredient, choose cooking, choose side, choose spicy, choose bread'
    ]
    const newMenu = Object.assign({}, this.props.menu)
    */
   
    sections.map((section, s) => {
      /*
      this.props.menu[section].items.map((item, i) => {
        newMenu[section].items[i].name = item.name.toLowerCase()
        let row = []

        row.push(item.name.replace(/\,/g, ' '))
        row.push(item.price)

        if (item.options && item.options.with) {
          row.push(item.options.with.join(' - '))
        } else {
          row.push('')
        }
        if (item.options && item.options.cook) {
          row.push(item.options.cook.join(' - '))
        } else {
          row.push('')
        }
        if (item.options && item.options.spicy) {
          row.push(item.options.spicy.join(' - '))
        } else {
          row.push('')
        }
        if (item.options && item.options.bread) {
          row.push(item.options.bread.join(' - '))
        } else {
          row.push('')
        }
        if (item.options && item.options.side) {
          row.push(item.options.side.join(' - '))
        } else {
          row.push('')
        }

        csvRows.push(row)
      })
      */
      elements.push(<DFContainer key={`menu-section-${ s }`}>
        <DFSectionTitle className="left-align menu-section">{ this.props.menu[section].title.en }</DFSectionTitle>
        <div className="menu-section">
          {
            this.props.menu[section].items.map((item, i) => {
              return <MenuItemComponent 
                key             = { `menu-item-${ i }` } 
                order           = { currentOrder } 
                addOrderItem    = { this.props.addOrderItem }
                removeOrderItem = { this.props.removeOrderItem }
                loggedin        = { this.props.user && this.props.user._id }
                { ...item }  
              />
            })
          }
          <div className="clear"></div>
        </div>
      </DFContainer>)
    })
    
    /*
    const csvMenu = csvRows.join('\r\n')
    console.log(csvMenu)
    console.log(JSON.stringify(newMenu))
    */

    return elements
  }

  render () {
    const token = shopToken()

    if (token) {
      this.props.history.push(`/${ currentShop }/shop`)

      return null
    }

    return  (<DFPageContainer className="menu-page">
      {
        this.props.menu  ?  this.renderMenu() : <p>Loading</p>
      }
    </DFPageContainer>)
  }
}

const mapStateToProps = (state) => {
    return {
        menu  : state.menu,
        orders : state.orders,
        user: state.user,
        app: state.app
    }
}

const mapDispatchToProps = dispatch => ({
  getMenu         : () => dispatch(fetchMenu()),
  addOrderItem    : (item) => dispatch(addItem(item)),
  removeOrderItem : (pid, index) => dispatch(removeItem(pid, index)),
  notify          : (txt, className) => dispatch(notify(txt, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)

/* <DFButton onClick={ () => this.props.notify('foo da bar', 'warning') }>good job bob</DFButton>
      <DFButton onClick={ () => this.props.notify('foo da bar', 'success') }>good job bob</DFButton>
      <DFButton onClick={ () => this.props.notify('foo da bar', 'error') }>good job bob</DFButton> */
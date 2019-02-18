import React, { PureComponent }   from 'react'
import { ajax }                   from 'jquery-ajax'
import { connect }                from 'react-redux'

import MenuItemComponent          from '../components/menu/Item.jsx'

import { DFPageContainer,
         DFContainer,
         DFPageTitle ,
         DFSectionTitle,
         DFSubTitle,
         DFItem }                 from '../elements/library'

import { addItem, removeItem }    from '../store/actions/ordersActions'
import { fetchMenu }              from '../store/actions/menuActions'

class MenuContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    if (!this.props.menu || !this.props.menu.items) {
      this.props.getMenu()
    }
  }


  renderMenu () {
    const elements = []
    const currentOrder = this.props.orders.current 
    const sections = Object.keys(this.props.menu)
    
    sections.map((section, s) => {

      elements.push(<DFContainer key={`menu-section-${ s }`}>
        <DFSectionTitle className="left-align">{ this.props.menu[section].title.en }</DFSectionTitle>
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
    
    return elements
  }

  render () {
    console.log(this.props)
    return  (<DFPageContainer>
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
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
  getMenu         : () => dispatch(fetchMenu()),
  addOrderItem    : (item) => dispatch(addItem(item)),
  removeOrderItem : (pid) => dispatch(removeItem(pid))
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)

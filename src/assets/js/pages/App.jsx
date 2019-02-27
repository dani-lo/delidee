import React, { PureComponent, Fragment }   from "react"
import ReactDOM                   from "react-dom"

import { Provider, connect }      from "react-redux"

import { BrowserRouter as Router, 
         Route, 
         NavLink,
         withRouter }             from "react-router-dom"

import store                      from "../store/store"
import OrdersContainer            from './Orders.jsx'
import AccountContainer           from './Account.jsx'
import MenuContainer              from './Menu.jsx'
import ShopContainer              from './Shop.jsx'
import ShopOrderContainer         from './ShopOrder.jsx'
import CheckoutContainer          from './Checkout.jsx'

import CurrentuserComponent       from '../components/user/Current.jsx'
import FlashMessage               from '../components/widgets/Flash.jsx'
import LogoutComponent            from '../components/user/Logout.jsx'

import { DFIcon,
        DFPageContainer,
        DFPageTitle,
        DFButton }                from '../elements/library'

import { shopToken }              from '../helper'

import APP_CONFIG                 from '../config'

const currentShop = APP_CONFIG.SHOP_ID

const GoToCheckoutButton =  withRouter(({ history }) => (
  <DFIcon 
    clickable 
    className="fas fa-shopping-cart" 
    onClick={() => history.push(`/${ currentShop }/checkout`) } 
  />
))

class App extends PureComponent {
  componentWillReceiveProps(p) {

  }
  header () {

    const token             = shopToken()
    const showRegistration  = !this.props.user._id
    const showCheckout      = this.props.user._id && _.get(this.props, 'orders.current.items.length', 0) > 0
    const active            = (path, invert) => {
      
      const docLoc            = document.location.href

      let activeClass

      if (!invert) {

        activeClass = docLoc.indexOf(path) !== -1 ? 'active' : 'unactive'

      } else if (invert && path.map) {
        activeClass = 'active' 

        path.map(p => {
          if (docLoc.indexOf(p) !== -1 ) {
            activeClass = 'unactive'
          }
        })
      }
 
      return activeClass
    }

    if (!token) {
      return <div id="header">
        
        <FlashMessage />
        <div className="header-login">
          <CurrentuserComponent />
        </div>
        {showCheckout ? <div className="header-checkout">
          <GoToCheckoutButton />
        </div> : null}
        <ul>
          <li>
            <NavLink exact activeClassName="selected" to={`/${ currentShop }`}>home</NavLink>
          </li>
          {!showRegistration ? <li>
            <NavLink activeClassName="selected" to={`/${ currentShop }/orders`}>orders</NavLink>
          </li> : null}
          <li>
            <NavLink activeClassName="selected" to={`/${ currentShop }/menu`}>menu</NavLink>
          </li>
          {showRegistration ? <li>
            <NavLink activeClassName="selected" to={`/${ currentShop }/account`}>register</NavLink>
          </li> : null}
        </ul>
      </div>
    } else {
      return <div id="header">
        <DFPageTitle>Shop Area</DFPageTitle>
        <FlashMessage />
        <ul>
          <li>
            <LogoutComponent />
          </li>
        </ul>
        </div>
    }
    
    return null
  }

  render () {
    
    // const 
    return <Router>
      <div id="app">
        { this.header() }
        <Route exact path={`/${ currentShop }`} component={ Home} />
        <Route path={`/${ currentShop }/orders`} component={ OrdersContainer } />
        <Route path={`/${ currentShop }/menu`} component={ MenuContainer } />
        <Route path={`/${ currentShop }/account`} component={ AccountContainer } />
        <Route path={`/${ currentShop }/shop`} component={ ShopContainer } />
        <Route path={`/${ currentShop }/shop-order/:orderId`} component={ ShopOrderContainer } />
        <Route path={`/${ currentShop }/checkout`} component={ CheckoutContainer } />
      </div>
  </Router>
  }
  
}

const mapStateToProps = (state) => {
    return {
      app   : state.app,
      menu  : state.menu,
      user  : state.user,
      orders: state.orders
    }
}

const DelifastApp = connect(mapStateToProps)(App)

const GoToShopButton =  withRouter(({ history }) => (
  <DFButton onClick={() => history.push(`/${ currentShop }/shop`) }>Start Management</DFButton>
))

const Home = (props) => {
  const token = shopToken()

  if (token) {
    props.history.push(`/${ currentShop }/shop`)

    return null
  }

  return (
    <DFPageContainer>
      <DFPageTitle>Welcome to { APP_CONFIG.SHOP.NAME }</DFPageTitle>
    </DFPageContainer>
  );
}

const wrapper = document.getElementById("app-main")

wrapper ? ReactDOM.render(<Provider store={store}>
    <DelifastApp />
  </Provider>, wrapper) : false

export default App
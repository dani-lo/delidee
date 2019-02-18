import React, { PureComponent }   from "react"
import ReactDOM                   from "react-dom"

import { Provider, connect }      from "react-redux"

import { BrowserRouter as Router, 
         Route, 
         Link,
         withRouter }             from "react-router-dom"

import store                      from "../store/store"
import OrdersContainer            from './Orders.jsx'
import AccountContainer           from './Account.jsx'
import MenuContainer              from './Menu.jsx'
import ShopContainer              from './Shop.jsx'
import ShopOrderContainer         from './ShopOrder.jsx'
import CurrentuserComponent       from '../components/user/Current.jsx'
import FlashMessage               from '../components/app/Flash.jsx'

import { DFContainer, 
         DFPageTitle,
         DFButton }               from '../elements/library'

import { shopToken }              from '../helper'

import APP_CONFIG                 from '../config'

class App extends PureComponent {
  
  onStateChange () {
    const user = this.props.user
  }

  header () {
    const token = shopToken()

    if (!token) {
      return <DFContainer id="header">
        <CurrentuserComponent />
        <ul className="menu">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/orders">orders</Link>
          </li>
          <li>
            <Link to="/menu">menu</Link>
          </li>
          <li>
            <Link to="/account">account</Link>
          </li>
        </ul>
      </DFContainer>
    }
    
    return null
  }

  render () {
    this.onStateChange()

    return <Router>
      <div id="app">
        { this.header() }
        <Route exact path="/" component={ Home} />
        <Route path="/orders" component={ OrdersContainer } />
        <Route path="/menu" component={ MenuContainer } />
        <Route path="/account" component={ AccountContainer } />
        <Route path="/shop" component={ ShopContainer } />
        <Route path="/shop-order/:orderId" component={ ShopOrderContainer } />
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
  <DFButton onClick={() => history.push('/shop') }>Start Management</DFButton>
))

const Home = () => {
  const token = shopToken()

  if (token) {
    return <DFContainer>
      <DFPageTitle>Shop Management Area</DFPageTitle>
      <GoToShopButton />
    </DFContainer>
  }
  return (
    <DFContainer>
      <DFPageTitle>Welcome to { APP_CONFIG.SHOP.NAME }</DFPageTitle>
    </DFContainer>
  );
}

const wrapper = document.getElementById("app-main")

wrapper ? ReactDOM.render(<Provider store={store}>
    <DelifastApp />
  </Provider>, wrapper) : false

export default App
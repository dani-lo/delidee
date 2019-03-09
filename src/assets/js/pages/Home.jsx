import React, { PureComponent }   from "react"
import { withRouter }             from "react-router-dom"

import { shopToken, 
         orderStatusContent,
         orderStatusColor,
         ORDER_STATUS }           from '../helper'

import APP_CONFIG                 from '../config'

import { DFPageContainer,
         DFPageTitle, 
         DFContainer,
         DFSubTitle,
         DFSectionTitle}      from '../elements/library'

const currentShop = APP_CONFIG.SHOP_ID


const AppLink     =  withRouter(( props ) => {
  const {history, text, page } = props

  return <a 
    href="#" 
    onClick={() => history.push(`/${ currentShop }/${ page }`) } 
  >{ text }</a>
})

class HomeContainer extends PureComponent {

  componentDidMount () {
    window.scrollTo(0, 0)
    const currClass = document.body.getAttribute('class')

    document.body.setAttribute('class', currClass + ' home')
  }

  componentWillUnmount () {
    const currClass = document.body.getAttribute('class')

    if (currClass && currClass.replace) {
      document.body.setAttribute('class', currClass.replace(' home', ''))
    }
    
  }
  
  render () {
    const token       = shopToken()
    const currentShop = APP_CONFIG.SHOP_ID

    if (token) {
      this.props.history.push(`/${ currentShop }/shop`)

      return null
    }

    const newIcon         = orderStatusContent(ORDER_STATUS.NEW)
    const startedIcon     = orderStatusContent(ORDER_STATUS.STARTED)
    const newColor        = orderStatusColor(ORDER_STATUS.NEW)
    const startedColor    = orderStatusColor(ORDER_STATUS.STARTED)

    return <DFPageContainer className="home-page ">
        <div className="shop-header">
          <img className="logo" src="/img/app/logo.png" />
          <DFPageTitle>{ APP_CONFIG.SHOP.NAME }</DFPageTitle>
          <p className="opening-times">Opening Time: <span>{ APP_CONFIG.SHOP.OPENING_TIME }</span></p>
        </div>
        <DFContainer>
          <DFSubTitle className="payoff  padding-l margin-l margin-top-xl">FREE DELIVERY ON ANY ORDER</DFSubTitle>
        </DFContainer>
        <DFContainer className="flex-parent">
          <DFContainer  className="flex-child home-bit padding-l margin-l">
            <DFSectionTitle>How It Works</DFSectionTitle>
            <p className="funny"><span className="evidence">It's Easy!</span></p>
            <p>Just <AppLink text="browse our menu" page="menu" /> and decide what you would like to order: you can easily place add Breakfast items, Burgers, Sandwiches, Thai classics, Western classics, cafe drinks, soft drinks and beer to an order</p>
            <p>This icon <i style={{ color: newColor} }  className="fas fa-shopping-cart" /> in the site header  will indicate you have an active order, and you can proceed to checkout if you so wish</p>
            <p>Upon checkout we will ask you to <span className="evidence">provide an account</span>, this is super easy and takes a minute.</p>
          </DFContainer>

          <DFContainer  className="flex-child home-bit padding-l margin-l">
            <img src="/img/marketing/siam-res.jpg" />
          </DFContainer>
        </DFContainer>
        <DFContainer className="flex-parent">
          <DFContainer  className="flex-child home-bit padding-l margin-l">
            <DFSectionTitle>Orders and Delivery</DFSectionTitle>
            <p><span>We are based in Rawai and cover the areas of <span className="evidence">Naiharn and Rawai</span> (up to the Chalong circle, not beyond). If your location falls beyound this area, we reserve the right o decline the order.</span></p>
            <p>Upon placing an order, you will be able to see it in your orders listing: <i style={{ color: newColor} } className={ newIcon.icon } /> this icon indicates the order has been successfully placed and is waiting to be started.</p>
            <p>Our staff will aknowledge your order and start the preparations - at that point you order icon will change to <i style={{ color: startedColor }} className={ startedIcon.icon} />. You can expect it to be delivered <span className="evidence">within 30min</span></p>
            <p>For any problems, you can call us (see contacts details below)</p>
          </DFContainer>

          <DFContainer  className="flex-child home-bit padding-l margin-l">
            <DFSectionTitle>Account</DFSectionTitle>
            <p>For us to be able to deliver you order, we need you to regiter with us: this can be done <AppLink text="now" page="account" /> or later, before placing your order</p>
            <p>Registration is easy: we will ask you to provide an email address, which we will simply use to identify your account as unique: <span className="evidence">we do not ues email addresses for marketing</span>, or share them with any third party</p>
            <p><span className="evidence">We do not store sensitive data</span>: we just need your location and address for delivery, that's it. We do not accept card payments, all payments are in cash at delivery</p>
          </DFContainer>
        </DFContainer>
      </DFPageContainer>
    }
}

export default HomeContainer
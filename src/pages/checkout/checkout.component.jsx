import React from 'react';
import {connect} from 'react-redux'
import './checkout.styles.scss'
import {createStructuredSelector} from 'reselect'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import {selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCartTotal} from '../../redux/cart/cart.selectors';

import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'


const CheckoutPage = ({cartItems, total}) => (
<div　className='checkout-page'> 
<div className='checkout-header'>
    <div className='header-block'>
        <span>Product</span>
    </div>
    <div className='header-block'>
        <span>Description</span>
    </div>
    <div className='header-block'>
        <span>Quantity </span>
    </div>
    <div className='header-block'>
        <span>Price</span>
    </div>
    <div className='header-block'>
        <span>Remove</span>
    </div>
</div>
{
    cartItems.map(cartItem=> (
        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
    ))
}
<div className='total'></div>
  <span> Total : ${total} </span>
  <div className='test-warning'> Please use the following test credit car </div>
  <br/>424242424242424242424 Exp 0/20 CVV - 123
  <StripeCheckoutButton price = {total}/>
</div>
)
    

const mapStateToProps = createStructuredSelector({
    cartItems :selectCartItems,
    total: selectCartTotal
})


export default connect(mapStateToProps) (CheckoutPage);


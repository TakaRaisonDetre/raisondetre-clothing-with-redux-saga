import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
   const priceForStripe = price *100; 
   const publishableKey = 'pk_test_F5EOxYdmSPflM0uS65wouPfQ';

  const onToken = token =>{
      console.log(token);
      alert('Payment Success')
  }


   return (
       <StripeCheckout 
         label='Pay Now'
         name ='Suruga Creater Village'
         billingAddress
         shippingAddress
         image=''
         description={`Yout total is $${price}`}
         amount ={priceForStripe}
         panelLabel ='Pay Now'
         token = {onToken}
         stripeKey={publishableKey}
       
       />
   )

}

export default StripeCheckoutButton 
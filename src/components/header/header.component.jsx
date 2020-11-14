import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './header.styles.scss';
import {auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.action'

const Header =({currentUser, hidden, signOutStart}) =>(
    <div className ='header'>
    <Link className='logo-container' to="/">
        
    </Link>
    <div className='options'>
        <Link className='option' to='/shop'>
            SHOP
        </Link>
        <Link className='option' to='/shop'>
            CONTACT
        </Link>
       
        {
            currentUser ? 
            <div className ='option' onClick={signOutStart}>SIGN-OUT</div>
            :
            <Link className='option' to='/signin'>SIGN-IN</Link>
        }
        <CartIcon />
    </div>
  {hidden?null : <CartDropDown />}
    </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  hidden: selectCartHidden
  });

  const mapDispatchToProps = dispatch =>({
      signOutStart : ()=> dispatch(signOutStart())
  })

export default connect(mapStateToProps,mapDispatchToProps)(Header);
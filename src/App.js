import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import {selectCurrentUser} from './redux/user/user.selectors';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/signin-signup/signin-signup.component';
import CheckoutPage from './pages/checkout/checkout.component'

import {setCurrentUser} from './redux/user/user.action'




class App extends React.Component {
  
  unsubscribeFromAuth = null


  componentDidMount(){

  

    // this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
    //  if(userAuth){
    //    const userRef = await createUserProfileDocument(userAuth);
       
    //    userRef.onSnapshot(snapShot=>{
         
    //       setCurrentUser({
    //           id : snapShot.id,
    //           ...snapShot.data()
          
    //          });
    //       });
    //      }
    //      setCurrentUser(userAuth);
    // });
  }


  componentWillUnmount (){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        {/* <Header currentUser = {this.state.currentUser}/> */}
        <Header />
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route  path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        {/* <Route exact  path='/signin' component={SignInAndSignUpPage} /> */}
        <Route exact path='/signin' render={()=> this.props.currentUser? (<Redirect to='/'/>): <SignInAndSignUpPage/>} />
        </Switch>
      
      </div>
    );
  }
  
}


const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
 
})



export default connect(mapStateToProps)(App);

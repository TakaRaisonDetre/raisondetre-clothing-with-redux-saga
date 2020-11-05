import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/signin-signup/signin-signup.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state ={
    currentUser : null
    }
  }

  // to avoid memory leak 
  unsubscribeFromAuth = null


  componentDidMount(){
    this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
     if(userAuth){
       const userRef = await createUserProfileDocument(userAuth);
       
       userRef.onSnapshot(snapShot=>{
         // console.log(snapShot.data());
         
          this.setState({
            currentUser : {
              id : snapShot.id,
              ...snapShot.data()
            }
            // setState is asyncronous therefore we need a call back function
          }, ()=>{
            console.log(this.state);
          })
          console.log(this.state)
       });
       
     } else {
       this.setState({currentUser: userAuth});
     }
    });
  }

  componentWillUnmount (){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route  path='/shop' component={ShopPage} />
        <Route  path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      
      </div>
    );
  }
  r
}

export default App;

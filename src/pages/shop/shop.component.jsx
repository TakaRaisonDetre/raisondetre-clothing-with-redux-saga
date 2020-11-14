import React from 'react';
import {Route} from 'react-router-dom'
import {connect } from 'react-redux'

import {fetchCollectionsStart} from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collection-overview.component'
import CollectionPageContainer from '../collection/collection.container.component'

import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container'
//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class  ShopPage extends React.Component {

// state={
//       loading: true   
//       };
 
 unsubscribeFromSnapshot = null;

 componentDidMount () {
   const {fetchCollectionsStart} = this.props;
   fetchCollectionsStart();
   // The below goes to action 
   // const collectionRef = firestore.collection('collections')
   
   // // promise base
   // collectionRef.get().then(snapshot=>{
   //    const collectionsMap =convertCollectionsSnapshotToMap(snapshot);
   //    updateCollection(collectionsMap);
   //    this.setState({loading:false});
   // })

   // observable base 
//   this.unsubscribeFromSnapshot= collectionRef.onSnapshot(async snapshot =>{
//        const collectionsMap= convertCollectionsSnapshotToMap(snapshot);
//        console.log(collectionsMap)
//        updateCollection(collectionsMap);
//        this.setState({loading: false});
//     })
 }
 
    render(){

     const {match, isCollectionsLoaded} = this.props; 
     
  return(
        <div className='shop-page'>
         {/* < Route exact path = {`${match.path}`} component={CollectionsOverview} /> */}
         < Route exact 
         path = {`${match.path}`} 
         component = {CollectionsOverviewContainer}/>
       
         {/* < Route path ={`${match.path}/:collectionId`} component={CollectionPage}/> */}
         < Route 
         path ={`${match.path}/:collectionId`} 
         component={CollectionPageContainer}/>
         </div>
         );
 }
}




const mapDispatchToProps = dispatch => ({
   fetchCollectionsStart : () => dispatch(fetchCollectionsStart())
})


export default connect(null, mapDispatchToProps)(ShopPage);
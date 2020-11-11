import React from 'react';
import {Route} from 'react-router-dom'
import {connect } from 'react-redux'

import {undateCollections} from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

class  ShopPage extends React.Component {
 
 unsubscribeFromSnapshot = null;

 componentDidMount () {

     const {updateCollection} = this.props;

    const collectionRef = firestore.collection('collections')
    collectionRef.onSnapshot(async snapshot =>{
       const collectionsMap= convertCollectionsSnapshotToMap(snapshot);
       console.log(collectionsMap)
       updateCollection(collectionsMap);
    })
 }
 
    render(){

     const {match} = this.props; 
  return(
        <div className='shop-page'>
         < Route exact path = {`${match.path}`} component={CollectionsOverview} />
         < Route path ={`${match.path}/:collectionId`} component={CollectionPage}/>
         </div>
         );
 }
}


const mapDispatchToProps = dispatch => ({
    updateCollection : collectionsMap => dispatch(undateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);
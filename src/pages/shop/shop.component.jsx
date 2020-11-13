import React from 'react';
import {Route} from 'react-router-dom'
import {connect } from 'react-redux'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

import {undateCollections} from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionsOverview from '../../components/collections-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class  ShopPage extends React.Component {

state={
      loading: true   
      };
 
 unsubscribeFromSnapshot = null;

 componentDidMount () {

   const {updateCollection} = this.props;
   const collectionRef = firestore.collection('collections')
   
   // promise base
   collectionRef.get().then(snapshot=>{
      const collectionsMap =convertCollectionsSnapshotToMap(snapshot);
      updateCollection(collectionsMap);
      this.setState({loading:false});
   })

   // observable base 
//   this.unsubscribeFromSnapshot= collectionRef.onSnapshot(async snapshot =>{
//        const collectionsMap= convertCollectionsSnapshotToMap(snapshot);
//        console.log(collectionsMap)
//        updateCollection(collectionsMap);
//        this.setState({loading: false});
//     })
 }
 
    render(){

     const {match} = this.props; 
     const {loading} = this.state;
  return(
        <div className='shop-page'>
         {/* < Route exact path = {`${match.path}`} component={CollectionsOverview} /> */}
         < Route exact 
         path = {`${match.path}`} 
         render={props=> ( 
         <CollectionsOverviewWithSpinner isloading={loading} {...props} /> )}
         />
       
         {/* < Route path ={`${match.path}/:collectionId`} component={CollectionPage}/> */}
         < Route 
         path ={`${match.path}/:collectionId`} 
         render={props=> ( 
         <CollectionPageWithSpinner isloading={loading} {...props}/> )} 
         />
         </div>
         );
 }
}


const mapDispatchToProps = dispatch => ({
    updateCollection : collectionsMap => dispatch(undateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);
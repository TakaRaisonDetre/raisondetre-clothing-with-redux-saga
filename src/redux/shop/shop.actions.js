import ShopActionTypes from './shop.types';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () =>({
 type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap =>({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload : collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type : ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage 
})

export const fetchCollectionsStartAsync = () =>{
    return dispatch => {
        const collectionRef = firestore.collection('collections')
         dispatch(fetchCollectionsStart());

        // promise base
        collectionRef.get().then(snapshot=>{
           const collectionsMap =convertCollectionsSnapshotToMap(snapshot);
           dispatch(fetchCollectionsSuccess(collectionsMap))
           //updateCollection(collectionsMap);
          // this.setState({loading:false});
        }).catch(error=> dispatch(fetchCollectionsFailure(error.message)))
    }
}



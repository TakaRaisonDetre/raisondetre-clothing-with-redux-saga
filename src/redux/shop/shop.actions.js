import ShopActionTypes from './shop.types';

export const undateCollections = (collectionsMap) =>({
 type: ShopActionTypes.UPDATE_COLLECTIONS,
 payload: collectionsMap    
})

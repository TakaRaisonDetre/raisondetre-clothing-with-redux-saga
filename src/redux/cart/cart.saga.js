import { all, call, put, takeLatest} from 'redux-saga/effects';

import UserActionTypes from '../../redux/user/user.types'
import {clearCart} from './cart.action'

export function* clearCartOnSignOut() {
    yield put(clearCart());
}


export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}


export function* cartSaga() {

    yield (all([call(onSignOutSuccess)]))
}
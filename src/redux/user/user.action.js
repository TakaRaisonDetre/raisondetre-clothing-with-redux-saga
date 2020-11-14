import UserActionTypes from './user.types'


export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const SignInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    paylaod: user
});

export const SignInFailure = error => ({
    type : UserActionTypes.SIGN_IN_FAILURE,
    paylaod: error
});


export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

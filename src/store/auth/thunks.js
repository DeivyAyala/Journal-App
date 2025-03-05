//! Son Taeras o acciones asincronas 

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWhithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { chekingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( chekingCredentials() )
    }
}


export const startGoogleSingIn = () =>{
    return async(dispatch) => {
        dispatch( chekingCredentials() );
        const result = await signInWhithGoogle()
        // console.log({result})
        if( !result.ok ) return dispatch( logout(result.errorMessage) );

        //* delete result.ok    Si se quiere eliminar la propiedad ok
        dispatch( login(result))
    }
}

export const startCreateingUserWithEmailPassword = ({email, password, displayName}) =>{
    return async(dispatch) => {
        dispatch(chekingCredentials()) // Para cuando incie con el email y el pasword, se autentifique 
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName });
        // console.log(resp);
        if( !ok ) return dispatch(logout({ errorMessage }) )
        
        dispatch(login({ uid, displayName, email, photoURL }) )
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    //! Va a llamar el provider
    //! Va a despachar el Logout o el Login

    return async(dispatch) => {
        dispatch(chekingCredentials()) // Para que se autentifique
        const {ok, uid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({email, password})
        if( !ok ) return dispatch(logout({errorMessage}) )
        
        dispatch(login( { uid, displayName, email, photoURL } ) )
       
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch( clearNotesLogout() )
        dispatch( logout() ) 

    }
}
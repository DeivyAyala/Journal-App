import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider;

export const signInWhithGoogle = async() => { //Para Autentificarse con Google 
    try{
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        // console.log({credentials})
        const {displayName, email, photoURL, uid} = result.user
        // console.log({user})

        return{
            ok: true,
            //User Info
            displayName, email, photoURL, uid
        }

    } catch(error){
        // console.log(error)
        
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok: false,
            errorMessage

        }
    }
}    


export const registerUserWithEmailPassword = async({email, password, displayName}) =>{
    try{
        // console.log({email,password,displayName})
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        // console.log(resp)


        //* TODO: actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, {displayName} )//Para saber cual es el uduario actual


        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch(error){
        // console.log(error)
        return {ok: false, errorMessage: error.message }
    }
}


export const loginWithEmailPassword = async({email, password}) => {
    //! signInWithEmailAndPassword
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL, displayName} = resp.user;
        

        //* TODO: actualizar el displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser, {displayName})

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch(error){
        return {ok: false, errorMessage: error.message}
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut(); //! Cierra todo google, usuario
}
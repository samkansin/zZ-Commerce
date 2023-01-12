import React, {useState, useEffect, useContext} from 'react'
import firebaseConfig from './config'
import firebase from 'firebase/compat/app';

export const AuthContext = React.createContext();

export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const googleSignIn = ()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log(provider);
        firebaseConfig.auth()
            .signInWithPopup(provider)
    };
    
    const logOut = () => {
        firebaseConfig.auth().signOut();
    }

    useEffect(()=>{
       const unsubscribe = firebaseConfig.auth().onAuthStateChanged((user) => {
                            setCurrentUser(user);
                            setLoading(false);
                            })
        console.log('User', currentUser);
        return () => {
            unsubscribe();
        }
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <AuthContext.Provider value={{googleSignIn, logOut, currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}
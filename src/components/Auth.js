import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import firebaseConfig from './config';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    firebaseConfig.auth().signInWithPopup(provider);
  };

  const logOut = () => {
    firebaseConfig.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    console.log('User', currentUser);
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);

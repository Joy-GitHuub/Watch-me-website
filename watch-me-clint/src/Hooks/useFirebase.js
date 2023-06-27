import React from 'react';
import initializeFirebase from '../Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import saveDb from '../API/saveDb';



initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = React.useState({});
    const [authError, setAuthError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    const handleGoogleSignUp = (location, navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const googleUser = result.user;
                setUser(googleUser);
                const destination = location?.state?.from || '/';
                navigate(destination);
                const date = new Date();

                const numOfHours = .10;
                date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
                localStorage.setItem('JWT-TOKEN', JSON.stringify(googleUser.accessToken));
                saveDb(googleUser.displayName, googleUser.email, googleUser.photoURL)

            }).catch((error) => {
                const errorMessage = error.message;
                setAuthError(errorMessage);
                setUser({});
            }).finally(() => setIsLoading(false));
    };


    // observer user state
    React.useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setUser({});
            localStorage.removeItem('JWT-TOKEN');
        }).catch((error) => {
            // An error happened.
            setAuthError(error.message)
        })
            .finally(() => setIsLoading(false));
    }


    return { user, authError, isLoading, handleGoogleSignUp, logout }


};

export default useFirebase;
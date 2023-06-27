import React, { createContext } from 'react';
import useFirebase from './../Hooks/useFirebase';
import useImage from './../Hooks/useImage';
import useUser from './../Hooks/useUser';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const { user, authError, isLoading, handleGoogleSignUp, logout } = useFirebase();

    const { images, setImages } = useImage();

    const { dbUser } = useUser();

    return (
        <AuthContext.Provider value={{ firebase: { user, authError, isLoading, handleGoogleSignUp, logout }, useImages: { images, setImages }, dbUser: { dbUser }, }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
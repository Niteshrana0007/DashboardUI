import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, } from 'firebase/auth';
import { auth } from '../config/firebase';
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children, }) => {
  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                     Name: user.displayName,
                    // displayName:user.name,
                    uid: user.uid,
                    email: user.email,
                });
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    // const signup = (displayName: string,email: string, password: string) => {
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logout = async () => {
        setUser(null);
        await signOut(auth);
    };
    const forgot = (email) => {
        sendPasswordResetEmail(auth, email);
    };
    
    return (
        <AuthContext.Provider value={{ user, login, signup, logout, forgot}}>
          {loading ? null : children}
        </AuthContext.Provider>
      )};

// export const useAuth = () => useContext(authUserContext);

export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefined'
    ? JSON.parse(localStorage.getItem('user'))
    : localStorage.clear();

  return userInfo;
}

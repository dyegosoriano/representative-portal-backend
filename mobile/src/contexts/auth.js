import React, { createContext, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function handleSignIn(email, password) {
    const response = await auth.signIn(email, password);

    setUser(response.user);

    await AsyncStorage.setItem(
      '@RepresentativePortal:user',
      JSON.stringify(response.user)
    );

    await AsyncStorage.setItem(
      '@RepresentativePortal:token',
      JSON.stringify(response.token)
    );
  }

  async function handleSignOut() {
    setUser(null);

    await AsyncStorage.removeItem('@RepresentativePortal:user');
    await AsyncStorage.removeItem('@RepresentativePortal:token');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        token: '',
        user,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

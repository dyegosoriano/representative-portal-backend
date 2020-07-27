import React, { createContext, useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';
import Loading from '../pages/Loading';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem(
        '@RepresentativePortal:user'
      );
      const storageToken = await AsyncStorage.getItem(
        '@RepresentativePortal:token'
      );

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function handleSignOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, handleSignIn, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

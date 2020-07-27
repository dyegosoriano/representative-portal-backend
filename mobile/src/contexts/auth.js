import React, { createContext, useState } from 'react';

import * as auth from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function handleSignIn(email, password) {
    const response = await auth.signIn(email, password);

    setUser(response.user);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        token: '',
        user,
        handleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

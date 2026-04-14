import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signIn(email, password) {
    // replace with real Firebase auth
    setUser({ email });
  }

  function register(email, password, role) {
    // replace with real Firebase auth
    setUser({ email, role });
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
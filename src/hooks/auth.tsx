import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: AuthState['user'];
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    const loadStorageData = async (): Promise<void> => {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token && user) setData({ token, user: JSON.parse(user) });
    };

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { data: signInData } = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = signInData;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuth can only be used within an AuthProvider');

  return context;
}

import { auth } from '@/configs/firebase';
import db from '@/configs/firestore';
import { useGetMeQuery } from '@/store/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { be } from 'date-fns/locale';
import {
  createUserWithEmailAndPassword,
  AuthError,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import router, { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
  const router = useRouter();

  const { data: user } = useGetMeQuery(
    {},
    {
      skip:
        typeof window !== 'undefined' &&
        !localStorage.getItem('user'),
    }
  );

  const handleRegister = async (params: any) => {
    try {
      const { user: authUser } = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );
      window.localStorage.setItem('authenticated', 'true');
      const userData = {
        id: authUser.uid,
        email: params.email,
        role: 'user',
        firstName: params.firstName,
        lastName: params.lastName,
        phoneNumber: params.phoneNumber,
        isEmail: params.isEmail,
        isWhatsApp: params.isWhatsApp,
      };
      await setDoc(doc(db, 'users', authUser.uid), userData);
      localStorage.setItem('user', JSON.stringify(authUser));
    } catch (error: any) {
      const authError = error;
      console.error('Error signing up:', authError);
      throw authError;
    }
  };

  const handleLogin = async (params: any) => {
    try {
      const { user: authUser }: any =
        await signInWithEmailAndPassword(
          auth,
          params.email,
          params.password
        );
      localStorage.setItem('user', JSON.stringify(authUser));
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const values = {
    user: user ?? null,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

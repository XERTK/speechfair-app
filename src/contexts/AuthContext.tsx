import { auth } from '@/configs/firebase';
import db from '@/configs/firestore';
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

const defaultProvider = {
  user: undefined,
  login: (params: any) => Promise.resolve(),
  logout: () => {},
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<any>(); // Provide the type explicitly.

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'));
    } else {
      setUser(null);
    }
  }, []);

  const handleRegister = async (params: any) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );
      window.localStorage.setItem('authenticated', 'true');
      const userData = {
        uid: user.uid,
        email: params.email,
        role: 'user',
        firstName: params.firstName,
        lastName: params.lastName,
        phoneNumber: params.phoneNumber,
        isEmail: params.isEmail,
        isWhatsApp: params.isWhatsApp,
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      setUser(user);
    } catch (error: any) {
      const authError = error;
      console.error('Error signing up:', authError);
      throw authError;
    }
  };

  const handleLogin = async (params: any) => {
    try {
      const res: any = await signInWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const values = {
    user,
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

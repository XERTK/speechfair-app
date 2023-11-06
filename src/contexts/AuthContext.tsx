import { auth } from '@/configs/firebase';
import { useGetMeQuery, useLoginMutation } from '@/store/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'next/router';
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
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const values = {
    user,
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

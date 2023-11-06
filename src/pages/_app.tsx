import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import 'simplebar-react/dist/simplebar.min.css';

// ** Store Imports
import { Provider } from 'react-redux';
import { createEmotionCache } from '@/utils/create-emotion-cache';
import { useNProgress } from '@/hooks/use-nprogress';
import { createTheme } from '@/theme';
import store from '@/store';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthGuard from '@/components/auth-guard';
import Loader from '@/components/loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

const Guard = ({ children, authGuard }: any) => {
  if (authGuard) {
    return <AuthGuard fallback={<Loader />}>{children}</AuthGuard>;
  } else {
    return <>{children}</>;
  }
};

const App = (props: any) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page: any) => page);

  const authGuard = Component.authGuard ?? true;

  const theme = createTheme();

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Fcorner Admin</title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Guard authGuard={authGuard}>
                {getLayout(<Component {...pageProps} />)}
              </Guard>
            </ThemeProvider>
          </LocalizationProvider>
        </AuthProvider>
        <ToastContainer position="bottom-left" />
      </CacheProvider>
    </Provider>
  );
};

export default App;

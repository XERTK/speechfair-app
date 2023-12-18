import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Link, Stack, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { redirect, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/use-auth';
import CustomField from '@/components/custom-field';
import { AuthLayout } from '@/layouts/auth/layout';
const newBackgroudImg = '/assets/auth-illustration2.jpg'; // Relative path

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const redirect = searchParams?.get('redirect') || '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      await login(data);
      router.push(redirect);
    } catch (err: any) {
      console.log('error', err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Fcorner Admin</title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  fontSize: 40,
                }}
              >
                Log In
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account?{' '}
                <NextLink href="/auth/register" passHref>
                  Register
                </NextLink>
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CustomField
                variant="filled"
                name="email"
                label="Email"
                control={control}
                error={errors.email}
              />
              <CustomField
                variant="filled"
                name="password"
                label="Password"
                type="password"
                control={control}
                error={errors.password}
              />
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

LoginPage.getLayout = (page: any) => (
  <AuthLayout backgroundImage={newBackgroudImg}>{page}</AuthLayout>
);

LoginPage.authGuard = false;

export default LoginPage;

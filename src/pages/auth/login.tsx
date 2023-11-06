import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { AuthLayout } from '@/layouts/auth/layout';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import CustomField from '@/components/custom-field';
import { useAuth } from '@/hooks/use-auth';

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
      email: 'gohar13@gmail.com',
      password: 'asdf1122',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
      router.push(redirect);
    } catch (err: any) {
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
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
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

LoginPage.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
LoginPage.authGuard = false;

export default LoginPage;

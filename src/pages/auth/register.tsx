import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Link,
  Stack,
  FormControlLabel,
  Typography,
  Checkbox,
} from '@mui/material';
import { useAuth } from '@/hooks/use-auth';
import CustomField from '@/components/custom-field';
import { AuthLayout } from '@/layouts/auth/layout';
const newBackgroudImg = '/assets/auth-illustration.jpg'; // Relative path
import logoImg from '../../../public/assets/main.png';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const phoneInputStyle = {
  input: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    color: 'lightgrey',
  },
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  firstName: Yup.string().max(255).required('Name is required'),
  lastName: Yup.string().max(255).required('Name is required'),
  password: Yup.string().max(255).required('Password is required'),
  dateOfBirth: Yup.string().required('Date is required'),
  phoneNumber: Yup.string().required(),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  ),
  isEmail: Yup.boolean(),
  isWhatsApp: Yup.boolean(),
});

interface FormData {
  email: string;
  password: string;
  passwordConfirmation?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  isEmail?: boolean;
  isWhatsApp?: boolean;
}

const Page = () => {
  const router = useRouter();
  const auth: any = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      dateOfBirth: '',
      isEmail: false, // Add initial value for isEmail
      isWhatsApp: false, // Add initial value for isWhatsApp
    },
  });
  const onSubmitHandler = async (data: FormData) => {
    try {
      console.log(data);
      await auth.register(data);
      router.push(redirect);
    } catch (err: any) {
      console.log('error 44444', err?.message);
      const errorMessage =
        err?.message?.split('Firebase: ')[1] || 'An error occurred';
      toast.error(errorMessage || 'An error occurred');
    }
  };

  return (
    <>
      <Head>
        <title>Register | Devias Kit</title>
      </Head>
      <Box
        sx={{
          width: '100%',
          px: 3,
          mt: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <img src={logoImg.src} alt="Logo" width={'55.61px'} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: 22,
              }}
            >
              Create your account
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#000000',
                fontSize: 16,
              }}
            >
              Already a Member?{' '}
              <Link
                component={NextLink}
                href="/auth/login"
                underline="none"
                sx={{
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: 16,
                  textDecoration: 'none',
                  borderBottom: '0.1rem solid #ffd600',
                  marginLeft: '0.5rem', // Add space between the two links
                }}
              >
                Log In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            px: 4,
          }}
        >
          <Typography
            sx={{
              mt: 1,
              mb: 2,
              color: '#888888',
              fontSize: 17,
            }}
          >
            Set up your account for your custom-made experience.
          </Typography>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack spacing={1} sx={{ mt: 3 }}>
              <CustomField
                label="Your First Name"
                name="firstName"
                placeholder="e.g Jane"
                variant="filled"
                control={control}
                error={errors.firstName}
                sx={{ mb: -3 }}
              />
              <CustomField
                label="Your Last Name"
                name="lastName"
                placeholder="e.g Doe"
                variant="filled"
                control={control}
                error={errors.lastName}
              />
              <CustomField
                label="Your Email"
                name="email"
                placeholder="e.g ada@gmail.com"
                variant="filled"
                control={control}
                error={errors.email}
              />
              Phone#
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country="pk"
                    value={field.value || ''}
                    inputStyle={{
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: '24px',
                      color: 'lightgrey',
                      backgroundColor: 'transparent',
                      borderRadius: 5,
                      width: '100%',
                      height: '55px',
                    }}
                  />
                )}
                rules={{ required: 'Phone number is required' }}
              />
              <CustomField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                variant="filled"
                control={control}
                error={errors.dateOfBirth}
              />
              <CustomField
                label="Your Password (8+ characters)"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                variant="filled"
                control={control}
                error={errors.password}
              />
              <CustomField
                label="Confirm Password "
                name="passwordConfirmation"
                type="password"
                placeholder="At least 8 characters"
                variant="filled"
                control={control}
                error={errors.passwordConfirmation}
              />
              <Typography
                sx={{
                  mt: 1,
                  mb: 2,
                  color: '#000000',
                  fontSize: 17,
                }}
              >
                Set up your account for your custom-made experience.
              </Typography>
              <Box>
                <Controller
                  control={control}
                  name="isEmail"
                  render={({
                    field: { onChange, value, name, ref },
                  }) => (
                    <Checkbox
                      onChange={onChange} // send value to hook form
                      inputRef={ref}
                    />
                  )}
                />
                Email
                <Controller
                  control={control}
                  name="isWhatsApp"
                  render={({
                    field: { onChange, value, name, ref },
                  }) => (
                    <Checkbox
                      onChange={onChange} // send value to hook form
                      inputRef={ref}
                    />
                  )}
                />
                WhatsApp
              </Box>{' '}
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
          </form>
          <Box sx={{ ml: 4 }}>
            <FormControlLabel label="" control={<Checkbox />} />
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                mb: 2,
                ml: -3,
                color: '#000000',
                fontSize: 16,
                display: 'inline',
              }}
            >
              I have read and agree to the{' '}
              <Link
                component={NextLink}
                href=""
                underline="none"
                sx={{
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: 16,
                  borderBottom: '0.1rem solid #ffd600',
                  display: 'inline-block',
                  marginLeft: '0.3rem', // Add space between links
                }}
              >
                Terms of Service
              </Link>
              {' and '}
              <Link
                component={NextLink}
                href="/"
                underline="none"
                sx={{
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: 16,
                  borderBottom: '0.1rem solid #ffd600',
                  display: 'inline-block',
                  marginLeft: '0.3rem',
                }}
              >
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <AuthLayout backgroundImage={newBackgroudImg}>{page}</AuthLayout>
);

export default Page;

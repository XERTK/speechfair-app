import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Formik, Form } from 'formik';
import { Link as ScrollLink } from 'react-scroll';

import * as Yup from 'yup';
import {
  Box,
  Button,
  Link,
  Stack,
  Typography,
  Dialog, // Import Dialog component
  DialogTitle, // Import DialogTitle component
  DialogContent, // Import DialogContent component
  DialogActions,
} from '@mui/material';

import logoImg from '../../../public/assets/main.png';
import { useState } from 'react';
// import 'react-phone-number-input/style.css'; // This imports the default CSS styles.
import CustomField from '@/components/custom-field';

import { AuthLayout } from '@/layouts/auth/layout';
import { useAuth } from '@/hooks/use-auth';
const newBackgroudImg = '/assets/auth-illustration2.jpg'; // Relative path

const Page = () => {
  const router = useRouter();

  const [openTermsModal, setOpenTermsModal] = useState(false); // State to control the modal

  // const auth = useAuth();
  const auth: any = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string()
        .max(255)
        .required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log('sigIn attempt');
        console.log(values.email);

        await auth.signIn(values.email, values.password);
        router.push('/');
      } catch (err: any) {
        helpers.setStatus({
          success: false,
          submit: 'An error occurred while signing in.',
        });

        helpers.setErrors({
          email: 'An error occurred while signing in email.',
        });
        helpers.setSubmitting(false);
        console.error(err.message);
      }
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

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
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#000000',
                fontSize: 16,
              }}
            >
              Not a Member Yet?{' '}
              <Link
                component={NextLink}
                href="/auth/register"
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
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            mt: 1,
            fontSize: 22,
          }}
        >
          Log In
        </Typography>
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
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={1} sx={{ mt: 3 }}>
              <CustomField
                label="Email" // Add the 'label' prop here
                error={formik.touched.email && formik.errors.email}
                name="email"
                type="email"
                placeholder="Your Email Address"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <CustomField
                label="password" // Add the 'label' prop here
                error={
                  formik.touched.password && formik.errors.password
                }
                name="password"
                type="password"
                placeholder="Your Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Stack>
            {formik.errors.submit && (
              <Typography
                color="error"
                sx={{ mt: 3 }}
                variant="body2"
              >
                {formik.errors.submit}
              </Typography>
            )}
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </form>
          <Box sx={{ py: 1 }}>
            <ScrollLink
              to="termsOfServiceSection"
              spy={true}
              smooth={true}
              duration={500}
              offset={-50}
              activeClass="active"
            >
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
                Forgot Password?
              </Link>
            </ScrollLink>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
      >
        <Typography
          sx={{
            ml: 10,
            mb: 2,
            color: '#000000',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          The entirety of this website is protected by international
          copyright © 2021–2022 AgoraGPS Ltd.
        </Typography>
      </Box>
      <Dialog open={openTermsModal} fullWidth maxWidth="md">
        <DialogTitle>Terms of Service</DialogTitle>
        <DialogContent>
          {/* Your Terms of Service content here */}
        </DialogContent>
        <DialogActions>
          <Button color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Page.getLayout = (page: any) => (
  <AuthLayout backgroundImage={newBackgroudImg}>{page}</AuthLayout>
);

export default Page;

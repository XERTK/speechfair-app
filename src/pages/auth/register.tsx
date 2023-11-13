import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Link,
  Stack,
  FormControlLabel,
  Typography,
  Dialog, // Import Dialog component
  DialogTitle, // Import DialogTitle component
  DialogContent, // Import DialogContent component
  DialogActions,
} from '@mui/material';
import { useState } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { useAuth } from '@/hooks/use-auth';
import CustomField from '@/components/custom-field';
import { AuthLayout } from '@/layouts/auth/layout';
import { useFormik } from 'formik';
const newBackgroudImg = '/assets/auth-illustration.jpg'; // Relative path
import logoImg from '../../../public/assets/main.png';
import PhoneInput from 'react-phone-number-input';

const phoneInputStyle = {
  input: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    color: 'lightgrey',
  },
  // Add any other styles you want to apply
};

const Page = () => {
  const router = useRouter();

  const [openTermsModal, setOpenTermsModal] = useState(false); // State to control the modal

  const auth: any = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      phonenumber: '',
      dateOfBirth: '',
      isEmail: false,
      isWhatsapp: false,
      submit: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstName: Yup.string().max(255).required('Name is required'),
      lastName: Yup.string().max(255).required('Name is required'),
      password: Yup.string()
        .max(255)
        .required('Password is required'),
      dateOfBirth: Yup.string().required('Date is required'),
    }),
    onSubmit: async (values, helpers) => {
      console.log('Form Input Values:', formik.values);
      try {
        await auth.signUp(
          values.email,
          values.firstName,
          values.lastName,
          values.password,
          values.phonenumber,
          values.dateOfBirth,
          values.isEmail,
          values.isWhatsapp
        );
        router.push('/auth/login');
      } catch (err: any) {
        helpers.setStatus({
          success: false,
          submit: 'An error occurred while signing in.',
          dateOfBirth: 'An error occurred while putting date in.',
        });
        helpers.setErrors({
          email: 'An error occurred while signing in.',
        });
        helpers.setSubmitting(false);
        console.log(err.message);
      }
    },
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

          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={1} sx={{ mt: 3 }}>
              <CustomField
                error={
                  formik.touched.firstName && formik.errors.firstName
                }
                label="Your First Name"
                name="firstName"
                placeholder="e.g Jane"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <CustomField
                error={
                  formik.touched.lastName && formik.errors.lastName
                }
                label="Your Last Name"
                name="lastName"
                placeholder="e.g Doe"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              <CustomField
                error={formik.touched.email && formik.errors.email}
                label="Your Email"
                name="email"
                type="email"
                placeholder="e.g ada@gmail.com"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <CustomField
                error={
                  formik.touched.dateOfBirth &&
                  formik.errors.dateOfBirth
                }
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
              />
              <label>Your phone number</label>

              {/* <MuiPhoneNumber
                sx={{
                  padding: 0,
                  mt: 0,
                  alignContent: 'auto',
                }}
                size="small"
                variant="outlined"
                defaultCountry={'pk'}
                val={formik.values.phonenumber.toString()} // Convert to a string
                onChange={(value: any) =>
                  formik.setFieldValue('phonenumber', value)
                }
                value={formik.values.phonenumber}
              /> */}

              {/* <PhoneInput
                sx={{
                  padding: 0,
                  mt: 0,
                  alignContent: 'auto',
                }}
                size="small"
                defaultCountry="PK"
                onChange={formik.handleChange}
                // value={formik.values.phonenumber}
                hiddenLabel
              /> */}
              {/* <PhoneInput
                sx={{
                  padding: 0,
                  mt: 0,
                  alignContent: 'auto',
                }}
                size="small"
                variant="outlined"
                value={formik.values.phonenumber}
                onChange={(value) =>
                  formik.setFieldValue('phonenumber', value)
                }
                // other props...
              />
               */}

              <PhoneInput
                defaultCountry="PK"
                country="US"
                onChange={(value) =>
                  formik.setFieldValue('phonenumber', value)
                }
                value={formik.values.phonenumber}
                flagIconStyle={{ width: '24px', height: '24px' }}
              />

              <CustomField
                error={
                  formik.touched.password && formik.errors.password
                }
                label="Your Password (8+ characters)"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                onChange={formik.handleChange}
                value={formik.values.password}
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!formik.values.isEmail} // Ensure it's a boolean
                      onChange={formik.handleChange}
                      name="isEmail"
                    />
                  }
                  label="Email"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!formik.values.isWhatsapp} // Ensure it's a boolean
                      onChange={formik.handleChange}
                      name="isWhatsapp"
                    />
                  }
                  label="WhatsApp"
                />
              </Box>
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
              I have read and agree to the
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
                  Terms of Service
                </Link>
              </ScrollLink>
              {' and'}
              <Link
                component={NextLink}
                href="/auth/login"
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
                Privacy Policy
              </Link>
            </Typography>
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

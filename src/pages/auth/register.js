import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  Link,
  Stack,
  TextField,
  Toolbar,
  Typography,
  Dialog, // Import Dialog component
  DialogTitle, // Import DialogTitle component
  DialogContent, // Import DialogContent component
  DialogActions,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import CustomField from "src/components/custom-field";
import logoImg from "../../../public/assets/main.png";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { Link as ScrollLink, Element } from "react-scroll";

const Page = () => {
  const router = useRouter();

  const [openTermsModal, setOpenTermsModal] = useState(false); // State to control the modal

  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      phonenumber: "",
      isEmail: false,
      isWhatsapp: false,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.email, values.name, values.password);
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const handleOpenTermsModal = () => {
    setOpenTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setOpenTermsModal(false);
  };

  return (
    <>
      <Head>
        <title>Register | Devias Kit</title>
      </Head>
      <Box
        sx={{
          width: "100%",

          px: 1,
          mt: 3,
        }}
      >
        <Toolbar sx={{ mb: 1, textAlign: "right" }}>
          <Box>
            <img src={logoImg.src} alt="Logo" width={"55.61px"} />
          </Box>
          <Box
            sx={{
              ml: "54%",
            }}
          >
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
                color: "#000000",
                fontSize: 16,
              }}
            >
              Already a Member?{" "}
              <Link
                component={NextLink}
                href="/auth/login"
                underline="none"
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: 16,
                  textDecoration: "none",
                  borderBottom: "0.1rem solid #ffd600",
                }}
              >
                Log In
              </Link>
            </Typography>
          </Box>
        </Toolbar>
      </Box>

      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            px: 4,
          }}
        >
          <Typography
            variant="body"
            sx={{
              mt: 1,
              mb: 2,
              color: "#888888",
              fontSize: 17,
            }}
          >
            Set up your account for your custom-made experience.
          </Typography>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={1} sx={{ mt: 3 }}>
              <CustomField
                error={formik.touched.firstName && formik.errors.firstName}
                label="Your First Name"
                name="firstName"
                placeholder="e.g Jane"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <CustomField
                error={formik.touched.lastName && formik.errors.lastName}
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
                error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
              />
              <label>Your phone number</label>
              <MuiTelInput
                sx={{
                  padding: 0,
                  mt: 0,
                  alignContent: "auto",
                }}
                size="small"
                defaultCountry="PK"
                value={formik.values.dateOfBirth}
                hiddenLabel
              />

              <CustomField
                error={formik.touched.password && formik.errors.password}
                label="Your Password (8+ characters)"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              <Typography
                variant="body"
                sx={{
                  mt: 1,
                  mb: 2,
                  color: "#000000",
                  fontSize: 17,
                }}
              >
                Set up your account for your custom-made experience.
              </Typography>
              <Box>
                <FormControlLabel control={<Checkbox />} label="Email" />
                <FormControlLabel control={<Checkbox />} label="WhatsApp" />
              </Box>
            </Stack>
            {formik.errors.submit && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {formik.errors.submit}
              </Typography>
            )}
            <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
              Sign Up
            </Button>
          </form>
          <Box sx={{ ml: 4 }}>
            <FormControlLabel control={<Checkbox />} />
            <Typography
              variant="body2"
              sx={{ mt: 1, mb: 2, ml: -3, color: "#000000", fontSize: 16, display: "inline" }}
            >
              I have read and agree to the
              <ScrollLink
                to="termsOfServiceSection" // This should match the Element's name attribute
                spy={true}
                smooth={true}
                duration={500} // Adjust the duration as needed
                offset={-50} // Adjust the offset as needed to properly position the section
                activeClass="active" // You can add a CSS class for the active link
              >
                <Link
                  component={NextLink}
                  href=""
                  underline="none"
                  sx={{
                    fontWeight: "bold",
                    color: "#000000",
                    fontSize: 16,

                    borderBottom: "0.1rem solid #ffd600",
                    display: "inline-block",
                    marginLeft: "0.3rem", // Add space between links
                  }}
                >
                  Terms of Service
                </Link>
              </ScrollLink>
              {" and"}
              <Link
                component={NextLink}
                href="/auth/login"
                underline="none"
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: 16,
                  borderBottom: "0.1rem solid #ffd600",
                  display: "inline-block",
                  marginLeft: "0.3rem", // Add space between links
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
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Typography
          variant="body"
          sx={{
            ml: 10,
            mb: 2,
            color: "#000000",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          The entirety of this website is protected by international copyright © 2021–2022 AgoraGPS
          Ltd.
        </Typography>
      </Box>
      <Dialog open={openTermsModal} onClose={handleCloseTermsModal} fullWidth maxWidth="md">
        <DialogTitle>Terms of Service</DialogTitle>
        <DialogContent>{/* Your Terms of Service content here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Element name="termsOfServiceSection" style={{ display: "none" }}>
        <section>
          <h1>Terms of Service</h1>

          <p>
            Welcome to Our Website! These terms and conditions outline the rules and regulations for
            the use of Our Company's Website, located at www.example.com.
          </p>

          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not
            continue to use Our Website if you do not agree to take all of the terms and conditions
            stated on this page.
          </p>

          <p>
            The following terminology applies to these Terms and Conditions, Privacy Statement, and
            Disclaimer Notice and all Agreements: "Client," "You," and "Your" refers to you, the
            person accessing this website and accepting the Company's terms and conditions. "The
            Company," "Ourselves," "We," "Our," and "Us," refers to our Company. "Party," "Parties,"
            or "Us," refers to both the Client and ourselves. All terms refer to the offer,
            acceptance, and consideration of payment necessary to undertake the process of our
            assistance to the Client in the most appropriate manner for the express purpose of
            meeting the Client's needs in respect of the provision of the Company's stated services,
            in accordance with and subject to, prevailing law of the Netherlands. Any use of the
            above terminology or other words in the singular, plural, capitalization, and/or they/he
            or she, are taken as interchangeable and therefore as referring to same.
          </p>

          <h2>Cookies</h2>

          <p>
            We employ the use of cookies. By accessing Our Website, you agreed to use cookies in
            agreement with Our Company's Privacy Policy.
          </p>

          <p>
            Most interactive websites use cookies to let us retrieve the user's details for each
            visit. Cookies are used by our website to enable the functionality of certain areas to
            make it easier for people visiting our website. Some of our affiliate/advertising
            partners may also use cookies.
          </p>

          <h2>License</h2>

          <p>
            Unless otherwise stated, Our Company and/or its licensors own the intellectual property
            rights for all material on Our Website. All intellectual property rights are reserved.
            You may access this from Our Website for your own personal use subjected to restrictions
            set in these terms and conditions.
          </p>

          <p>You must not:</p>
          <ul>
            <li>Republish material from Our Website</li>
            <li>Sell, rent, or sub-license material from Our Website</li>
            <li>Reproduce, duplicate, or copy material from Our Website</li>
            <li>Redistribute content from Our Website</li>
          </ul>

          <h2>Content Liability</h2>

          <p>
            We shall not be held responsible for any content that appears on your Website. You agree
            to protect and defend us against all claims that are rising on your Website. No link(s)
            should appear on any Website that may be interpreted as libelous, obscene, or criminal,
            or which infringes, otherwise violates, or advocates the infringement or other violation
            of, any third party rights.
          </p>

          <p>Your Privacy</p>

          <p>Please read Privacy Policy</p>

          <h2>Reservation of Rights</h2>

          <p>
            We reserve the right to request that you remove all links or any particular link to Our
            Website. You approve to immediately remove all links to Our Website upon request. We
            also reserve the right to amend these terms and conditions and it's linking policy at
            any time. By continuously linking to Our Website, you agree to be bound to and follow
            these linking terms and conditions.
          </p>

          <h2>Removal of Links from Our Website</h2>

          <p>
            If you find any link on Our Website that is offensive for any reason, you are free to
            contact and inform us at any moment. We will consider requests to remove links but we
            are not obligated to or so or to respond to you directly.
          </p>

          <p>
            We do not ensure that the information on this website is correct, we do not warrant its
            completeness or accuracy; nor do we promise to ensure that the website remains available
            or that the material on the website is kept up to date.
          </p>

          <h2>Disclaimer</h2>

          <p>
            To the maximum extent permitted by applicable law, we exclude all representations,
            warranties, and conditions relating to our website and the use of this website. Nothing
            in this disclaimer will:
          </p>
          <ul>
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>
              limit or exclude our or your liability for fraud or fraudulent misrepresentation;
            </li>
            <li>
              limit any of our or your liabilities in any way that is not permitted under applicable
              law; or
            </li>
            <li>
              exclude any of our or your liabilities that may not be excluded under applicable law.
            </li>
          </ul>

          <p>
            The limitations and prohibitions of liability set in this Section and elsewhere in this
            disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities
            arising under the disclaimer, including liabilities arising in contract, in tort, and
            for breach of statutory duty.
          </p>

          <p>
            As long as the website and the information and services on the website are provided free
            of charge, we will not be liable for any loss or damage of any nature.
          </p>
        </section>
      </Element>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;

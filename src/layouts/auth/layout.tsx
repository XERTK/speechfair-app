import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';

export const AuthLayout = (props: {
  children: React.ReactNode;
  backgroundImage: string;
}) => {
  const { children, backgroundImage } = props; // Add the backgroundImage prop here
  return (
    <Grid container component="main">
      <Grid item md={6}>
        <Box
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh',
          }}
        ></Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: 'background.paper',
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};

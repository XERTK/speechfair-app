import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Logo } from "src/components/logo";

export const Layout = (props) => {
  const { children, backgroundImage } = props; // Add the backgroundImage prop here
  return (
    <Grid component="main" container>
      <Grid item md={6}>
        <Box
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          {console.log(backgroundImage)}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "background.paper",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

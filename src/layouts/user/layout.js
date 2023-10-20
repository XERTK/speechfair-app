import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Logo } from "src/components/logo";

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;

  return <>{children}</>;
};

Layout.prototypes = {
  children: PropTypes.node,
};

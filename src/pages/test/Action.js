import { Box } from '@mui/material';
import React from 'react';

const Action = ({ handleClick, type, className }) => {
  return (
    <Box className={className} onClick={handleClick}>
      {type}
    </Box>
  );
};

export default Action;

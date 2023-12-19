import { Box, LinearProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color="inherit" />
    </Box>
  );
};

export default Loader;

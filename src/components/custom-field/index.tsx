import { Box, TextField } from '@mui/material';
import React from 'react';

interface CustomFieldProps {
  error: any;
  label: string;
  [rest: string]: any; // Allow any other props
}

const CustomField: React.FC<CustomFieldProps> = ({
  error,
  label,
  ...rest
}) => {
  return (
    <>
      <Box>
        {label}
        <TextField
          size="small"
          error={!!error}
          helperText={error}
          type="text"
          fullWidth
          {...rest}
          style={{
            marginBottom: '16px', // Use 'marginBottom' instead of 'mb'
          }}
          hiddenLabel
        />
      </Box>
    </>
  );
};

export default CustomField;

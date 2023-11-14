import React from 'react';
import {
  TextField,
  FormControl,
  FormHelperText,
  TextFieldProps,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { Box } from '@mui/system';

type CustomFieldProps = {
  control: any;
  rules?: any;
  error?: any;
} & Partial<TextFieldProps>;

function CustomField({
  name,
  control,
  rules,
  error,
  label,
  inputProps,
  ...rest
}: CustomFieldProps) {
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        name={name || ''}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Box>
            {label}
            <TextField
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={Boolean(error)}
              InputProps={{
                inputProps: inputProps,
              }}
              fullWidth
              {...rest}
              style={{
                marginBottom: '16px', // Use 'marginBottom' instead of 'mb'
              }}
              hiddenLabel
            />
          </Box>
        )}
      />
      {error && (
        <FormHelperText sx={{ color: 'error.main' }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomField;

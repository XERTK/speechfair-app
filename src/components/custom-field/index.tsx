import React from 'react';
import {
  TextField,
  FormControl,
  FormHelperText,
  TextFieldProps,
} from '@mui/material';
import { Controller } from 'react-hook-form';

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
          <TextField
            {...rest}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            error={Boolean(error)}
            InputProps={{
              inputProps: inputProps,
            }}
          />
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

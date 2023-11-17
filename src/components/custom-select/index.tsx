import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller } from 'react-hook-form';

type CustomSelectFieldProps = {
  label: string;
  name: string;
  control: any;
  error?: any;
  options: any[];
};

function CustomSelectField({
  label,
  name,
  control,
  error,
  options,
  ...rest
}: CustomSelectFieldProps) {
  return (
    <Grid xs={12} md={3} container direction="column">
      <FormControl sx={{ mb: 4 }}>
        <InputLabel variant="filled" id="demo-simple-select-label">
          {label}
        </InputLabel>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              variant="filled"
              label={label}
              {...field}
              {...rest}
              defaultValue={
                options.length > 0 ? options[0].value : ''
              }
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {error && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {error.message}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}

export default CustomSelectField;

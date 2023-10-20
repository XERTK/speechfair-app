import { Box, Input, TextField } from "@mui/material";
import React from "react";

const CustomField = ({ error, label, ...rest }) => {
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
            mb: "16px",
          }}
          hiddenLabel
        />
      </Box>
    </>
  );
};

export default CustomField;

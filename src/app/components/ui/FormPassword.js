import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Input,
} from '@mui/material';

import { VisibilityOff, Visibility } from '@mui/icons-material';

const FormPassword = ({ inputId, formLabel, className, inputRef, onFocus, defaultValue }) => {
  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = (evt) => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        id={inputId}
        label={formLabel}
        inputRef={inputRef}
        onFocus={onFocus}
        className={className}
        defaultValue={defaultValue}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={showPasswordHandler}
              onMouseDown={showPasswordHandler}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export default FormPassword;

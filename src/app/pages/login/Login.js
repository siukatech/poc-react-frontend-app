import { useRef, useContext, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import AuthContext from '../../../base/stores/AuthContext';
import FormPassword from '../../components/ui/FormPassword';

import {
  Box,
  InputLabel,
  FormHelperText,
  FormControl,
  Grid,
  Input,
  OutlinedInput,
  TextField,
  ButtonGroup,
  Button,
  Stack,
} from '@mui/material';

const Login = () => {
  const usernameInputRef = useRef('');
  const passwordInputRef = useRef('');
  const { login } = useContext(AuthContext);
  const [isDirty, setIsDirty] = useState(false);

  const { t, i18n } = useTranslation();

  const loginSubmitHandler = async (evt) => {
    evt.preventDefault();
    setIsDirty(false);
    let payload = {
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    await login(payload);
  };

  const resetFormHandler = (evt) => {
    evt.preventDefault();
    console.log(evt);
    if (evt.target.form != null) {
      evt.target.form.reset();
    }
    setIsDirty(false);
  };

  const formFocusedHandler = () => {
    //navigate(-1);
    //setIsDirty(true);
    setIsDirty((prevState) => {
      console.log('formFocusedHandler - prevState: [' + prevState + ']');
      if (prevState === true) {
        return prevState;
      } else return true;
      return true;
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={loginSubmitHandler}
        sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1 }}
      >
        <Stack sx={{ width: '100%' }}>
          <Box sx={{ m: 1, width: '100%' }}>
            <legend>{t('login.form')}</legend>
          </Box>
          <TextField
            label={t('login.username.label')}
            inputRef={usernameInputRef}
            id="formUserName"
            helperText={t('login.username.helperText')}
            sx={{ m: 1, width: '80%' }}
            defaultValue={`app-user-01`}
          />
          <FormControl sx={{ m: 1, width: '80%' }}>
            <InputLabel htmlFor="formPassword">
              {t('login.password.label')}
            </InputLabel>
            <FormPassword
              inputId={`formPassword-helper`}
              formLabel={t('login.password.label')}
              className={``}
              inputRef={passwordInputRef}
              onFocus={formFocusedHandler}
              defaultValue={`admin01`}
            />
            <FormHelperText id="formPassword-helper">
              {t('login.password.helperText')}
            </FormHelperText>
          </FormControl>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={{ m: 1 }}
          >
            <Button variant="outlined" color="primary" type="submit">
              {t('button.login')}
            </Button>
            <Button variant="outlined" color="secondary" type="button" onClick={resetFormHandler}>
              {t('button.reset')}
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
      {/* <Box
        component="form"
        onSubmit={loginSubmitHandler}
        sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={10} md={9}>
            <FormControl><legend>Login Form</legend></FormControl>
          </Grid>
          <Grid item xs={10} md={9}>
            <TextField
              label={t('login.username.label')}
              inputRef={usernameInputRef}
              id="formUserName"
              helperText={t('login.username.helperText')}
              sx={{ m: 1, width: '100%' }}
            />
          </Grid>
          <Grid item xs={10} md={9}>
            <FormControl sx={{ m: 1, width: '100%' }}>
              <InputLabel htmlFor="formPassword">{t('login.password.label')}</InputLabel>
              <FormPassword
                inputId={`formPassword-helper`}
                formLabel={t('login.password.label')}
                className={``}
                inputRef={passwordInputRef}
                onFocus={formFocusedHandler}
              />
              <FormHelperText id="formPassword-helper">
                {t('login.password.helperText')}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={10} md={9}>
            <ButtonGroup
              variant="outlined"
              aria-label="outlined button group"
              sx={{ m: 1, width: '100%' }}
            >
              <Button variant="outlined" color="primary" type="submit">
                {t('button.login')}
              </Button>
              <Button 
                variant="outlined"
                color="secondary"
                type="button"
                onClick={resetFormHandler}
              >
                {t('button.reset')}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
};
export default Login;

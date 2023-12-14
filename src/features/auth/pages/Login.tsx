import {
  useRef,
  useContext,
  useState,
  FormEvent,
  MutableRefObject,
} from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useAuthContext } from '../stores/AuthContext';
import FormPassword from '../../../frameworks/ui/components/FormPassword';

import { DoAuthLoginPayload } from '../services/LoginService';

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
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { Navigate } from 'react-router-dom';

const formFieldSxDefault = { m: 1, width: '80%' };

const Login = () => {
  const loginFormRef = useRef<null | HTMLFormElement>(null);
  const usernameInputRef = useRef<null | HTMLInputElement>(null);
  const passwordInputRef = useRef<null | HTMLInputElement>(null);
  const { user, doLogin } = useAuthContext();
  const [isDirty, setIsDirty] = useState(false);

  const { t, i18n } = useTranslation();

  const handleFormSubmit = async (
    evt: FormEvent<HTMLFormElement>
  ): Promise<any> => {
    evt.preventDefault();
    setIsDirty(false);
    let payload: DoAuthLoginPayload = {
      username: usernameInputRef.current?.value,
      password: passwordInputRef.current?.value,
    };
    await doLogin(payload);
  };

  const handleFormReset = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log(evt);
    // if (evt?.target?.form != null) {
    //   evt?.target?.form.reset();
    // }
    evt.currentTarget.form?.reset();
    loginFormRef.current?.reset();
    setIsDirty(false);
  };

  const handleFormFocus = () => {
    //navigate(-1);
    //setIsDirty(true);
    setIsDirty((prevState) => {
      console.log('handleFormFocus - prevState: [' + prevState + ']');
      if (prevState === true) {
        return prevState;
      } else return true;
    });
  };

  return (
    <>
      {user == null && (
        <Card>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1 }}
            // ref={loginFormRef}
          >
            <Stack sx={{ width: '100%' }}>
              <CardContent>
                <Box sx={{ ...formFieldSxDefault }}>
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
                    onFocus={handleFormFocus}
                    defaultValue={`admin01`}
                  />
                  <FormHelperText id="formPassword-helper">
                    {t('login.password.helperText')}
                  </FormHelperText>
                </FormControl>
              </CardContent>
              <CardActions>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                  sx={{ m: 1 }}
                >
                  <Button variant="outlined" color="primary" type="submit">
                    {t('button.login')}
                  </Button>
                  {/* <Button variant="outlined" color="secondary" type="button" onClick={handleFormReset}>
              {t('button.reset')}
            </Button> */}
                  <Button variant="outlined" color="secondary" type="reset">
                    {t('button.reset')}
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Stack>
          </Box>
        </Card>
      )}
      {user != null && <Navigate to={`/`} />}
    </>
  );
};
export default Login;

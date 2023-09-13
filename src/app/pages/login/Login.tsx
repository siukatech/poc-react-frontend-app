import {
  useRef,
  useContext,
  useState,
  FormEvent,
  MutableRefObject,
} from 'react';
import { useTranslation, Trans } from 'react-i18next';
import AuthContext from '../../../base/stores/AuthContext';
import FormPassword from '../../components/ui/FormPassword';

import { DoAuthLoginPayload } from '../../../base/services/LoginService';

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


const formFieldSxDefault = { m: 1, width: '80%' };


const Login = () => {
  const loginFormRef = useRef<null | HTMLFormElement>(null);
  const usernameInputRef = useRef<null | HTMLInputElement>(null);
  const passwordInputRef = useRef<null | HTMLInputElement>(null);
  const { login } = useContext(AuthContext);
  const [isDirty, setIsDirty] = useState(false);

  const { t, i18n } = useTranslation();

  const submitFormHandler = async (
    evt: FormEvent<HTMLFormElement>
  ): Promise<any> => {
    evt.preventDefault();
    setIsDirty(false);
    let payload: DoAuthLoginPayload = {
      username: usernameInputRef.current?.value,
      password: passwordInputRef.current?.value,
    };
    await login(payload);
  };

  const resetFormHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log(evt);
    // if (evt?.target?.form != null) {
    //   evt?.target?.form.reset();
    // }
    evt.currentTarget.form?.reset();
    loginFormRef.current?.reset();
    setIsDirty(false);
  };

  const focusFormHandler = () => {
    //navigate(-1);
    //setIsDirty(true);
    setIsDirty((prevState) => {
      console.log('focusFormHandler - prevState: [' + prevState + ']');
      if (prevState === true) {
        return prevState;
      } else return true;
    });
  };

  return (
    <>
      <Card>
        <Box
          component="form"
          onSubmit={submitFormHandler}
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
                  onFocus={focusFormHandler}
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
                {/* <Button variant="outlined" color="secondary" type="button" onClick={resetFormHandler}>
              {t('button.reset')}
            </Button> */}
                <Button variant="outlined" color="secondary" type="reset">
                  {t('button.reset')}
                </Button>
              </ButtonGroup>
            </CardActions>
          </Stack>
        </Box>
        {/* <Box
        component="form"
        onSubmit={submitFormHandler}
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
              sx={{ ...formFieldSxDefault }}
            />
          </Grid>
          <Grid item xs={10} md={9}>
            <FormControl sx={{ ...formFieldSxDefault }}>
              <InputLabel htmlFor="formPassword">{t('login.password.label')}</InputLabel>
              <FormPassword
                inputId={`formPassword-helper`}
                formLabel={t('login.password.label')}
                className={``}
                inputRef={passwordInputRef}
                onFocus={focusFormHandler}
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
              sx={{ ...formFieldSxDefault }}
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
      </Card>
    </>
  );
};
export default Login;

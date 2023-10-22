import { useRef, useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../../base/stores/AuthContext';

import FormPassword from '../../components/ui/FormPassword';

const Login = () => {
  const usernameInputRef = useRef('');
  const passwordInputRef = useRef('');
  const { login } = useContext(AuthContext);
  const [isDirty, setIsDirty] = useState(false);

  const { t, i18n } = useTranslation();

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();
    setIsDirty(false);
    let payload = {
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    await login(payload);
  };

  const handleFormReset = (evt) => {
    evt.preventDefault();
    console.log(evt);
    if (evt.target.form != null) {
      evt.target.form.reset();
    }
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
      return true;
    });
  };

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Login Form</legend>
            <form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={usernameInputRef}
                  onFocus={handleFormFocus}
                />
              </Form.Group>
              {/*<Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordInputRef}
                  onFocus={handleFormFocus}
                />
  </Form.Group>*/}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>{t('Password')}</Form.Label>
                <FormPassword
                  className="mb-3" 
                  inputRef={passwordInputRef}
                  onFocus={handleFormFocus}
                />
              </Form.Group>
              <Stack direction="horizontal" gap={2}>
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleFormReset}
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;

import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

const FormPassword = ({
  className,
  inputRef,
  onFocus,
}) => {
  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordShow = (evt) => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <InputGroup className={className}>
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          ref={inputRef}
          onFocus={onFocus}
        />
        <InputGroup.Text>
          {showPassword && <EyeSlash onClick={handlePasswordShow} title={t('Show Password')} />}
          {!showPassword && <Eye onClick={handlePasswordShow} title={t('Hide Password')} />}
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};

export default FormPassword;

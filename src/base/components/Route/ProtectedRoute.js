import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import AuthContext from '../../stores/AuthContext';
import DialogPrompt from '../../../app/components/ui/DialogPrompt';

enum ProtectedRouteAccessBy {
  PUBLIC = 'PUBLIC', // non-authenticated
  PROTECTED = 'PROTECTED', // authenticated
}

type IProtectedRouteProps = {
  children: React.ReactNode;
  accessBy: ProtectedRouteAccessBy;
};

const ProtectedRoute = ({ children, accessBy }: IProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (accessBy === ProtectedRouteAccessBy.PUBLIC) {
    if (!user) {
      return children;
    }
  } else if (accessBy === ProtectedRouteAccessBy.PROTECTED) {
    if (user) {
      return children;
    }
  }
  // return <Navigate to="/?access=denied" />;
  return (
    <DialogPrompt
      open={true}
      title={t('error.login.failed')}
      // message={t('warning.access.denied')}
      onOk={() => {
        navigate('/?access=denied');
      }}
    />
  );
};

export default ProtectedRoute;
export { ProtectedRouteAccessBy };

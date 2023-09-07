import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../../stores/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  accessBy: string;
};

const ProtectedRoute = ({ children, accessBy }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);

  if (accessBy == 'non-authenticated') {
    if (!user) {
      return children;
    }
  } else if (accessBy == 'authenticated') {
    if (user) {
      return children;
    }
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;

import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import AuthContext from '../../stores/AuthContext';
import DialogPrompt from '../../../app/components/UI/DialogPrompt';
import { AxiosError } from 'axios';

enum ProtectedRouteAccessBy {
  PUBLIC = 'PUBLIC', // non-authenticated
  PROTECTED = 'PROTECTED', // authenticated
}

interface IDialogPromptInfo {
  title?: string;
  message?: string;
  url?: string;
}

type IProtectedRouteProps = {
  children: React.ReactNode;
  accessBy: ProtectedRouteAccessBy;
};

const ProtectedRoute = ({ children, accessBy }: IProtectedRouteProps) => {
  const { user, checkTimeout } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [checkTimeoutErr, setCheckTimeoutErr] = useState<any>(null);
  let showChildren = false;

  useEffect(() => {
    if (accessBy === ProtectedRouteAccessBy.PROTECTED) {
      const fetchData = async () => {
        // // await checkTimeout();
        checkTimeout();
        // try {
        //   checkTimeout();
        // } catch (err) {
        //   console.error('ProtectedRoute - useEffect - err 1: ', err);
        //   setCheckTimeoutErr(err);
        // }
        console.error('ProtectedRoute - useEffect - 2');
      };
      fetchData().catch((reject) => {
        console.error('ProtectedRoute - useEffect - reject 2: ', reject);
        (reject as Promise<AxiosError>).then((err) => setCheckTimeoutErr(err));
        // setCheckTimeoutErr(err);
      });
      // try {
      //   checkTimeout();
      // } catch (err) {
      //   console.error('ProtectedRoute - useEffect - err: ', err);
      //   setCheckTimeoutErr(err);
      // }
    }
  }, [accessBy, checkTimeout]);

  let dialogPromptInfo: IDialogPromptInfo = {};
  if (checkTimeoutErr != null) {
    if (checkTimeoutErr.code == AxiosError.ERR_BAD_REQUEST) {
      dialogPromptInfo = {
        title: 'error.login.failed',
        message: 'warning.access.denied',
        url: '/?access=denied',
      } as IDialogPromptInfo;
    } else if (checkTimeoutErr.code == AxiosError.ERR_CANCELED) {
      dialogPromptInfo = {
        title: 'error.login.timeout',
        message: 'warning.login.timeout',
        url: '/?access=timeout',
      } as IDialogPromptInfo;
    }
  } else {
    if (accessBy === ProtectedRouteAccessBy.PUBLIC) {
      if (!user) {
        // return children;
        showChildren = true;
      }
      else {
        // navigate('/');
        showChildren = true;
      }
    } else if (accessBy === ProtectedRouteAccessBy.PROTECTED) {
      if (user) {
        // return children;
        showChildren = true;
      }
    } else {
      dialogPromptInfo = {
        title: 'error.login.failed',
        message: 'warning.access.denied',
        url: '/?access=denied',
      };
    }
  }
  // return <Navigate to="/?access=denied" />;
  return (
    <>
      <div>dialogPromptInfo.title: [{dialogPromptInfo.title}], showChildren: [{showChildren + ''}], checkTimeoutErr.code: [{checkTimeoutErr?.code}]</div>
      {dialogPromptInfo.title != null && (
        <DialogPrompt
          open={true}
          title={t(dialogPromptInfo.title)}
          // message={t(dialogPromptInfo.message)}
          onOk={() => {
            navigate(`${dialogPromptInfo.url}`);
          }}
        />
      )}
      {dialogPromptInfo.title == null && showChildren && children}
      {/* {dialogPromptInfo.title == null && checkTimeoutErr == null && !showChildren && (<Navigate to={`/?dialogPromptInfo.title=${dialogPromptInfo.title}&showChildren=${showChildren}&checkTimeoutErr.code=${checkTimeoutErr?.code}`} />)} */}
    </>
  );
};

export default ProtectedRoute;
export { ProtectedRouteAccessBy };

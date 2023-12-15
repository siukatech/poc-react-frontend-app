import { useEffect } from 'react';
import {
  unstable_useBlocker as useBlocker,
  unstable_Blocker as Blocker,
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from '@mui/material';

import DialogPrompt from './DialogPrompt';

const UnloadPrompt = ({
  blocker,
  message,
  isDirty,
//  chooseModal = true,
}: {
  blocker?: Blocker;
  message: string;
  isDirty: boolean;
  // chooseModal?: boolean;
}) => {
  const { t, i18n } = useTranslation();

  const isActive = blocker != null && 'blocked' === blocker.state;
  const onOk = isActive ? blocker.proceed : () => {};
  const onCancel = isActive ? blocker.reset : () => {};

  useEffect(() => {
    console.debug(
      'UnloadPrompt - useEffect - handleBeforeUnload - 1 - isActive: [' +
        isActive +
        '], isDirty: [' +
        isDirty +
        ']'
    );
    const beforeUnloadVoid = (evt: BeforeUnloadEvent) => {};
    const beforeUnloadMessage = (evt: BeforeUnloadEvent) => {
      evt.returnValue = message;
    };
    if (isDirty === false) {
      window.onbeforeunload = beforeUnloadVoid;
    } else if (isActive || isDirty) {
      window.onbeforeunload = beforeUnloadMessage;
    }
    return () => {
      window.onbeforeunload = beforeUnloadVoid;
    };
  }, [isActive, isDirty]);

  return (
    <>
      {isActive && (
        <DialogPrompt
          open={true}
          title={message}
          // message={''}
          onOk={onOk}
          onCancel={onCancel}
        />
      )}
    </>
  );
};

export default UnloadPrompt;

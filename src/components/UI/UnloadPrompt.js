import React, { useEffect } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

import classes from './UnloadPrompt.module.css';

import Modal from './Modal';

const UnloadPrompt = ({ blocker, message, isDirty, chooseModal = true }) => {
  const isActive = blocker != null && 'blocked' === blocker.state;
  const onOk = isActive ? blocker.proceed : () => {};
  const onCancel = isActive ? blocker.reset : () => {};

  useEffect(() => {
    console.log(
      'UnloadPrompt - useEffect - beforeUnloadHandler - 1 - isActive: [' +
        isActive +
        '], isDirty: [' +
        isDirty +
        ']'
    );
    if (isDirty === false) {
      window.onbeforeunload = (event) => {};
    } else if (isActive || isDirty) {
      window.onbeforeunload = (event) => {
        event.returnValue = message;
      };
    }

    return () => {
      window.onbeforeunload = (event) => {};
    };
  }, [isActive, isDirty]);


  // if (isActive && isDirty) {
  //   console.log(
  //     'UnloadPrompt - useEffect - beforeUnloadHandler - 2 - isActive: [' +
  //       isActive +
  //       '], isDirty: [' +
  //       isDirty +
  //       ']'
  //   );
  //   if (window.confirm('test2')) onOk();
  //   else onCancel();
  // }

  return (
    <>
      {isActive && chooseModal && (
        <Modal onClose={onCancel}>
          <div>
            {
              //<p>Are you sure you want to leave? All your entered data will be lost!</p>
            }
            <p>{message}</p>
            <button onClick={onOk}>Ok</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UnloadPrompt;

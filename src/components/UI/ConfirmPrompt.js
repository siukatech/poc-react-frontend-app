import React from 'react';

import Modal from './Modal';

import classes from './ConfirmPrompt.module.css';

const ConfirmDialog = ({ message, onOk, onCancel, onClose }) => {

  return (
    <>
      <Modal onClose={onClose}>
        <div>
          <p>{message}</p>
          <button onClick={onOk}>Ok</button>
          {onCancel && <button onClick={onCancel}>Cancel</button>}
        </div>
      </Modal>
    </>
  );
};

export default ConfirmDialog;

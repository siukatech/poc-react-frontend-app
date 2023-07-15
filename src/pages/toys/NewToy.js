import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { addNewToy } from '../../services/ToyService';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ConfirmDialog from '../../components/UI/ConfirmPrompt';
import ToyForm from '../../components/toys/ToyForm';

const NewToy = () => {
  const navigate = useNavigate();
  const { sendRequest: postRequest, status: postStatus, data: addedObj, error: postError } = useHttp(addNewToy);

  // useEffect(() => {
  //   if (postStatus === 'completed' && addedObj != null) {
  //     //navigate('/toys');
  //   }
  // }, [postStatus]);

  const addNewHandler = (toyRec) => {
    postRequest(toyRec);
  };

  return (
    <>
      {postStatus === 'pending' && (
        //<div className="centered">
        <LoadingSpinner />
        //</div>
      )}
      {postStatus === 'completed' && (
        <ConfirmDialog
          message={`Record updated (${addedObj.id}, ${addedObj.title})`}
          onOk={() => navigate('/toys')}
        />
      )}
      <div>postStatus: {postStatus}</div>
      <ToyForm onSubmit={addNewHandler} />
    </>
  );
};

export default NewToy;

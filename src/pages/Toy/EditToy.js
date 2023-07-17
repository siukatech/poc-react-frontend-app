import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getSingleToy, updateToy } from '../../services/ToyService';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ConfirmDialog from '../../components/UI/ConfirmPrompt';
import ToyForm from '../../components/Toy/ToyForm';

const EditToy = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const { toyId } = params;
  const {
    sendRequest: getRequest,
    status: getStatus,
    data: loadedObj,
    error: getError,
  } = useHttp(getSingleToy);
  const {
    sendRequest: putRequest,
    status: putStatus,
    data: updatedObj,
    error: updateError,
  } = useHttp(updateToy);

  useEffect(() => {
    getRequest(toyId);
  }, [getRequest, showConfirmDialog]);

  const updateHandler = (toyRec) => {
    setShowConfirmDialog(true);
    //toyRec.versionNo = 1;
    //toyRec.versionNo = loadedObj.versionNo;  // temporary added here, should prepare in Form
    putRequest(toyRec);
  };
  // if (putStatus === 'error') {
  //   if (showConfirmDialog === false) {
  //     setShowConfirmDialog(true);
  //   }
  // } else if (putStatus === 'pending' || putStatus === 'completed') {
  //   if (showConfirmDialog === true) {
  //     setShowConfirmDialog(false);
  //   }
  // }
  //message={`Record updated (${updatedObj.id}, ${updatedObj.title})`}
  return (
    <>
      {putStatus === 'pending' && <LoadingSpinner />}
      {putStatus === 'error' && showConfirmDialog && (
        <ConfirmDialog
          message={`Record error (${updateError.detail})`}
          onOk={() => setShowConfirmDialog(false)}
        />
      )}
      {putStatus === 'completed' && showConfirmDialog && (
        <ConfirmDialog
          message={`Record updated (${updatedObj.id}, ${updatedObj.title})`}
          onOk={() => navigate('/toys')}
        />
      )}
      {getStatus === 'pending' && <LoadingSpinner />}
      <div>
        getStatus: {getStatus}, putStatus: {putStatus}
      </div>
      {getStatus === 'completed' && (
        <ToyForm onSubmit={updateHandler} toyObj={loadedObj} />
      )}
    </>
  );
};

export default EditToy;

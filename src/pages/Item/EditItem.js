import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getSingleItem, updateItem } from '../../services/ItemService';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ConfirmDialog from '../../components/UI/ConfirmPrompt';
import ItemForm from '../../components/Item/ItemForm';

const EditItem = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const { itemId } = params;
  const {
    sendRequest: getRequest,
    status: getStatus,
    data: loadedObj,
    error: getError,
  } = useHttp(getSingleItem);
  const {
    sendRequest: putRequest,
    status: putStatus,
    data: updatedObj,
    error: updateError,
  } = useHttp(updateItem);

  useEffect(() => {
    getRequest(itemId);
  }, [getRequest, showConfirmDialog]);

  const updateHandler = (itemRec) => {
    setShowConfirmDialog(true);
    //itemRec.versionNo = 1;
    //itemRec.versionNo = loadedObj.versionNo;  // temporary added here, should prepare in Form
    putRequest(itemRec);
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
  //message={`Record updated (${updatedObj.id}, ${updatedObj.name})`}
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
          message={`Record updated (${updatedObj.id}, ${updatedObj.name})`}
          onOk={() => navigate('/items')}
        />
      )}
      {getStatus === 'pending' && <LoadingSpinner />}
      <div>
        getStatus: {getStatus}, putStatus: {putStatus}
      </div>
      {getStatus === 'completed' && (
        <ItemForm onSubmit={updateHandler} itemObj={loadedObj} />
      )}
    </>
  );
};

export default EditItem;

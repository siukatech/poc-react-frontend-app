import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { addNewItem } from '../../services/ItemService';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ConfirmDialog from '../../components/UI/ConfirmPrompt';
import ItemForm from '../../components/Item/ItemForm';

const NewItem = () => {
  const navigate = useNavigate();
  const { sendRequest: postRequest, status: postStatus, data: addedObj, error: postError } = useHttp(addNewItem);

  // useEffect(() => {
  //   if (postStatus === 'completed' && addedObj != null) {
  //     //navigate('/items');
  //   }
  // }, [postStatus]);

  const addNewHandler = (itemRec) => {
    postRequest(itemRec);
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
          message={`Record updated (${addedObj.id}, ${addedObj.name})`}
          onOk={() => navigate('/items')}
        />
      )}
      <div>postStatus: {postStatus}</div>
      <ItemForm onSubmit={addNewHandler} />
    </>
  );
};

export default NewItem;

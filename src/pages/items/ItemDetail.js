import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getSingleItem, getEncryptedItem } from '../../services/ItemService';

import ItemView from '../../components/items/ItemView';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ItemDetail = () => {
  //const match = useMatch();
  const params = useParams();

  const { itemId } = params;

  const {
    sendRequest: getRequest,
    status: getStatus,
    data: loadedObj,
    error: getError,
  } = useHttp(
    getSingleItem
    // getEncryptedItem
    , true);

  useEffect(() => {
    getRequest(itemId);
  }, [getRequest]);

  return (
    <>
      {getStatus === 'pending' && (
        <LoadingSpinner />
      )}
      {getStatus === 'completed' && (<ItemView itemId={itemId} {...loadedObj} />)}
    </>
  );
};

export default ItemDetail;

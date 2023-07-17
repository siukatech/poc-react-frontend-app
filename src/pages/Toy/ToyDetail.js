import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getSingleToy, getEncryptedToy } from '../../services/ToyService';

import ToyView from '../../components/Toy/ToyView';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ToyDetail = () => {
  //const match = useMatch();
  const params = useParams();

  const { toyId } = params;

  const {
    sendRequest: getRequest,
    status: getStatus,
    data: loadedObj,
    error: getError,
  } = useHttp(
    getSingleToy
    // getEncryptedToy
    , true);

  useEffect(() => {
    getRequest(toyId);
  }, [getRequest]);

  return (
    <>
      {getStatus === 'pending' && (
        <LoadingSpinner />
      )}
      {getStatus === 'completed' && (<ToyView toyId={toyId} {...loadedObj} />)}
    </>
  );
};

export default ToyDetail;

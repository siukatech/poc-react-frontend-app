import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getAllToys } from '../../services/ToyService';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import NoToysFound from '../../components/Toy/NoToysFound';
import ToyList from '../../components/Toy/ToyList';

const AllToys = () => {
  const navigate = useNavigate();
  const {
    sendRequest: getRequest,
    status: getStatus,
    data: loadedList,
    error: getError,
  } = useHttp(getAllToys, true);

  useEffect(() => {
    getRequest();
  }, [getRequest]);


  if (getError) {
    if (getError.statusCode == null) {
      navigate('/');
    }
    else {
      return <p className="centered focused">{getError}</p>;
    }
  }

  if (getStatus === 'pending') {
    return (
      <>
        {
          //<div className="centered">
          <LoadingSpinner />
          //</div>
        }
      </>
    );
  }

  if (getStatus === 'completed' && (!loadedList || loadedList.length === 0)) {
    return <NoToysFound />;
  }

  return <ToyList items={loadedList} />;
};

export default AllToys;

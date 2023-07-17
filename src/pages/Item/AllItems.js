import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getAllItems } from '../../services/ItemService';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import NoItemsFound from '../../components/Item/NoItemsFound';
import ItemList from '../../components/Item/ItemList';

const AllItems = () => {
  const navigate = useNavigate();
  const {
    sendRequest: getRequest,
    status: getStatus,
    data: loadedList,
    error: getError,
  } = useHttp(getAllItems, true);

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
    return <NoItemsFound />;
  }

  return <ItemList items={loadedList} />;
};

export default AllItems;

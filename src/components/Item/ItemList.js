import React, { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './ItemList.module.css';

import ItemSnippet from './ItemSnippet';

const sortItems = (list, ascending) => {
  return list.sort((obj1, obj2) => {
    // if (ascending) return obj1.id > obj2.id ? 1 : -1;
    // else return obj1.id < obj2.id ? 1 : -1;
    // let obj1Lmdt = parseJSON(obj1.lastModifiedDatetime);
    // let obj2Lmdt = parseJSON(obj2.lastModifiedDatetime);
    let obj1Lmdt = obj1.lastModifiedDatetime;
    let obj2Lmdt = obj2.lastModifiedDatetime;
    if (ascending) return obj1Lmdt > obj2Lmdt ? 1 : -1;
    else return obj1Lmdt < obj2Lmdt ? 1 : -1;
  });
};

const ItemList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('Sort') === 'asc';
  const sortedItems = sortItems(props.items, isSortingAscending);

  const handleSortingChange = (e) => {
    // navigate.push({
    //   pathname: location.pathname
    //   , search: `${(isSortingAscending? 'desc': 'asc')}`
    // })
    let pathname = `${location.pathname}?Sort=${
      isSortingAscending ? 'desc' : 'asc'
    }`;
    navigate(pathname, {
      // state: {
      //   search: `${(isSortingAscending? 'desc': 'asc')}`
      // }
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={handleSortingChange}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedItems.map((itemObj, idx) => (
          <ItemSnippet
            key={itemObj.id}
            id={itemObj.id}
            name={itemObj.name}
            purchasedDate={itemObj.purchasedDate}
            lastModifiedDatetime={itemObj.lastModifiedDatetime}
            versionNo={itemObj.versionNo}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ItemList;

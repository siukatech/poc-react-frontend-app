import React, { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './ToyList.module.css';

import ToyItem from './ToyItem';

const sortToys = (list, ascending) => {
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

const ToyList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('Sort') === 'asc';
  const sortedToys = sortToys(props.items, isSortingAscending);

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
        {sortedToys.map((toyObj, idx) => (
          <ToyItem
            key={toyObj.id}
            id={toyObj.id}
            title={toyObj.title}
            purchasedDate={toyObj.purchasedDate}
            lastModifiedDatetime={toyObj.lastModifiedDatetime}
            versionNo={toyObj.versionNo}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ToyList;

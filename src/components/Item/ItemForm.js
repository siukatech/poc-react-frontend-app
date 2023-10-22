import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  unstable_usePrompt as usePrompt,
  unstable_useBlocker as useBlocker,
  useNavigate,
} from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import classes from './ItemForm.module.css';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import UnloadPrompt from '../UI/UnloadPrompt';

const ItemForm = (props) => {
  let itemObj = props.itemObj == null ? {} : { ...props.itemObj };

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isDirty, setIsDirty] = useState(false);

  const blocker = useBlocker(isDirty);
  console.log(
    'ItemForm - itemObj.id: [' +
      itemObj.id +
      '], isDirty: [' +
      isDirty +
      '], blocker.state: [' +
      (blocker != null && blocker.state != null ? blocker.state : 'null') +
      ']'
  );

  // usePrompt(
  //   {
  //   when: isDirty
  //   , message: 'Hello from usePrompt -- Are you sure you want to leave?'
  // }
  // );

  // useEffect(() => {
  //   console.log(
  //     'useEffect - blocker.state: [' +
  //       blocker.state +
  //       '], isDirty: [' +
  //       isDirty +
  //       ']'
  //   );
  //   if (blocker.state === 'blocked' && !isDirty) {
  //     blocker.reset();
  //   }
  // }, [blocker.state, isDirty]);

  const nameInputRef = useRef();
  const purchasedDateInputRef = useRef();

  let purchasedDateValue =
    itemObj.purchasedDate == null ? new Date() : itemObj.purchasedDate;
  purchasedDateValue = purchasedDateValue.toISOString().substring(0, 10);

  // const blocker = useBlocker('Are you sure you want to leave? All your entered data will be lost!', isDirty);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let itemRec = {
      //id: itemObj == null ? null : itemObj.id
      //      id: 1,
      id: itemObj.id,
      name: nameInputRef.current.value,
      purchasedDate: purchasedDateInputRef.current.value,
      versionNo: itemObj.versionNo,
    };
    console.log(itemRec);
    console.log(
      'handleFormSubmit - isDirty: [' +
        isDirty +
        // '], blocker.state: [' +
        // blocker.state +
        ']'
    );
    // throw new Error('this is a test from ItemForm submit');

    // setIsDirty((prevState) => {
    //   console.log(
    //     'handleEnteringFinish - prevState: [' +
    //       prevState +
    //       // '], blocker.state: [' +
    //       // blocker.state +
    //       ']'
    //   );
    //   return false;
    // });
    setIsDirty(false);
    props.onSubmit(itemRec);

    // if (blocker != null && blocker.state === 'proceeding')
    //   blocker.proceed();
  };

  const handleFormReset = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.form != null) {
      e.target.form.reset();
    }
    setIsDirty(false);
  };

  // const handleEnteringFinish = () => {
  //   setIsDirty((prevState) => {
  //     console.log(
  //       'handleEnteringFinish - prevState: [' +
  //         prevState +
  //         '], blocker.state: [' +
  //         blocker.state +
  //         ']'
  //     );
  //     return '';
  //   });
  // };
  const handleFormFocus = () => {
    //navigate(-1);
    //setIsDirty(true);
    setIsDirty((prevState) => {
      console.log('handleFormFocus - prevState: [' + prevState + ']');
      if (prevState === true) {
        return prevState;
      } else return true;
      return true;
    });
  };

  return (
    <>
      {/*<ReactRouterPrompt when={isDirty}>
        {({ isActive, onConfirm, onCancel }) =>
          isActive && (
            <Card>
              <div>
                <p>
                  Are you sure you want to leave? All your entered data will be
                  lost!
                </p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
              </div>
            </Card>
          )
        }
      </ReactRouterPrompt>*/}
      {/*blocker && blocker.state === 'proceeding' && (
        <div>Its entering, cant refresh</div>
      )*/}
      <UnloadPrompt
        blocker={blocker}
        message="Are you sure you want to leave? All your entered data will be lost!"
        isDirty={isDirty}
      />
      {
        //          onFocus={handleFormFocus}
      }
      <Card>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <div className={classes.control}>
            <label>{t('form.blocker.state')}: </label>
            <div>{blocker.state}</div>
          </div>
          <div className={classes.control}>
            <label>{t('form.id-dirty')}: </label>
            <div>{isDirty ? 'true' : 'false'}</div>
          </div>
          {itemObj.id && (
            <div className={classes.control}>
              <label>{t('item.id')}: </label>
              <div>{itemObj.id}</div>
            </div>
          )}
          <div className={classes.control}>
            <label>{t('item.versionNo')}: </label>
            <div>{itemObj.versionNo}</div>
          </div>
          <div className={classes.control}>
            <label>{t('item.lastModifiedDatetime')}: </label>
            <div>{format(itemObj.lastModifiedDatetime, 'yyyy-MM-dd HH:mm:ss')}</div>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">{t('item.name')}: </label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              onFocus={handleFormFocus}
              defaultValue={itemObj.name}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="purchasedDate">{t('item.purchasedDate')}: </label>
            <input
              type="date"
              id="purchasedDate"
              ref={purchasedDateInputRef}
              onFocus={handleFormFocus}
              defaultValue={purchasedDateValue}
            />
          </div>
          <div className={classes.actions}>
            {
              //<button onClick={handleEnteringFinish} >{t('button.save')}</button>
            }
            <button>{t('button.save')}</button>
            <button onClick={handleFormReset}>{t('button.reset')}</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              {t('button.back')}
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default ItemForm;

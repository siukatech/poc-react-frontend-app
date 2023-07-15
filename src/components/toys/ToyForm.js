import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  unstable_usePrompt as usePrompt,
  unstable_useBlocker as useBlocker,
  useNavigate,
} from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import classes from './ToyForm.module.css';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import UnloadPrompt from '../UI/UnloadPrompt';

const ToyForm = (props) => {
  let toyObj = props.toyObj == null ? {} : { ...props.toyObj };

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isDirty, setIsDirty] = useState(false);

  const blocker = useBlocker(isDirty);
  console.log(
    'ToyForm - toyObj.id: [' +
      toyObj.id +
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

  const titleInputRef = useRef();
  const purchasedDateInputRef = useRef();

  let purchasedDateValue =
    toyObj.purchasedDate == null ? new Date() : toyObj.purchasedDate;
  purchasedDateValue = purchasedDateValue.toISOString().substring(0, 10);

  // const blocker = useBlocker('Are you sure you want to leave? All your entered data will be lost!', isDirty);

  const submitFormHandler = (e) => {
    e.preventDefault();
    let toyRec = {
      //id: toyObj == null ? null : toyObj.id
      //      id: 1,
      id: toyObj.id,
      title: titleInputRef.current.value,
      purchasedDate: purchasedDateInputRef.current.value,
      versionNo: toyObj.versionNo,
    };
    console.log(toyRec);
    console.log(
      'submitFormHandler - isDirty: [' +
        isDirty +
        // '], blocker.state: [' +
        // blocker.state +
        ']'
    );
    // throw new Error('this is a test from ToyForm submit');

    // setIsDirty((prevState) => {
    //   console.log(
    //     'finishEnteringHandler - prevState: [' +
    //       prevState +
    //       // '], blocker.state: [' +
    //       // blocker.state +
    //       ']'
    //   );
    //   return false;
    // });
    setIsDirty(false);
    props.onSubmit(toyRec);

    // if (blocker != null && blocker.state === 'proceeding')
    //   blocker.proceed();
  };

  const resetFormHandler = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.form != null) {
      e.target.form.reset();
    }
    setIsDirty(false);
  };

  // const finishEnteringHandler = () => {
  //   setIsDirty((prevState) => {
  //     console.log(
  //       'finishEnteringHandler - prevState: [' +
  //         prevState +
  //         '], blocker.state: [' +
  //         blocker.state +
  //         ']'
  //     );
  //     return '';
  //   });
  // };
  const formFocusedHandler = () => {
    //navigate(-1);
    //setIsDirty(true);
    setIsDirty((prevState) => {
      console.log('formFocusedHandler - prevState: [' + prevState + ']');
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
        //          onFocus={formFocusedHandler}
      }
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler}>
          <div className={classes.control}>
            <label>{t('form.blocker.state')}: </label>
            <div>{blocker.state}</div>
          </div>
          <div className={classes.control}>
            <label>{t('form.id-dirty')}: </label>
            <div>{isDirty ? 'true' : 'false'}</div>
          </div>
          {toyObj.id && (
            <div className={classes.control}>
              <label>{t('toy.id')}: </label>
              <div>{toyObj.id}</div>
            </div>
          )}
          <div className={classes.control}>
            <label>{t('toy.versionNo')}: </label>
            <div>{toyObj.versionNo}</div>
          </div>
          <div className={classes.control}>
            <label>{t('toy.lastModifiedDatetime')}: </label>
            <div>{format(toyObj.lastModifiedDatetime, 'yyyy-MM-dd HH:mm:ss')}</div>
          </div>
          <div className={classes.control}>
            <label htmlFor="title">{t('toy.title')}: </label>
            <input
              type="text"
              id="title"
              ref={titleInputRef}
              onFocus={formFocusedHandler}
              defaultValue={toyObj.title}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="purchasedDate">{t('toy.purchasedDate')}: </label>
            <input
              type="date"
              id="purchasedDate"
              ref={purchasedDateInputRef}
              onFocus={formFocusedHandler}
              defaultValue={purchasedDateValue}
            />
          </div>
          <div className={classes.actions}>
            {
              //<button onClick={finishEnteringHandler} >{t('button.save')}</button>
            }
            <button>{t('button.save')}</button>
            <button onClick={resetFormHandler}>{t('button.reset')}</button>
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

export default ToyForm;

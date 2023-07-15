import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { parseJSON, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { formatDate, formatDatetime } from '../../utils/date';

import classes from './ToyView.module.css';

const ToyView = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <figure className={classes.toy}>
        <p>
          {t('toy.id')}: {props.id} ({props.toyId})
        </p>
        <p>
          {t('toy.title')}: {props.title}
        </p>
        <p>
          {t('toy.lastModifiedDatetime')}:
          {
            //format(parseJSON(props.lastModifiedDatetime), 'yyyy-MM-dd HH:mm:ss')
            //parseJSON(props.lastModifiedDatetime).toString()
            //format(props.lastModifiedDatetime, 'yyyy-MM-dd HH:mm:ss')
            formatDatetime(props.lastModifiedDatetime)
          }
        </p>
        <figcaption>
          {t('toy.purchasedDate')}:{' '}
          {
            //format(props.purchasedDate, 'yyyy-MM-dd')
            formatDate(props.purchasedDate)
          }
        </figcaption>
      </figure>
      <Link className="btn" to={`/toys`}>
        {t('button.back')}
      </Link>
      <Link className="btn" to={`/toys/${props.toyId}/edit`}>
        {t('button.edit')}
      </Link>
    </>
  );
};

export default ToyView;

import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { parseJSON, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { formatDate, formatDatetime } from '../../utils/date';

import classes from './ItemView.module.css';

const ItemView = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <figure className={classes.item}>
        <p>
          {t('item.id')}: {props.id} ({props.itemId})
        </p>
        <p>
          {t('item.name')}: {props.name}
        </p>
        <p>
          {t('item.lastModifiedDatetime')}:
          {
            //format(parseJSON(props.lastModifiedDatetime), 'yyyy-MM-dd HH:mm:ss')
            //parseJSON(props.lastModifiedDatetime).toString()
            //format(props.lastModifiedDatetime, 'yyyy-MM-dd HH:mm:ss')
            formatDatetime(props.lastModifiedDatetime)
          }
        </p>
        <figcaption>
          {t('item.purchasedDate')}:{' '}
          {
            //format(props.purchasedDate, 'yyyy-MM-dd')
            formatDate(props.purchasedDate)
          }
        </figcaption>
      </figure>
      <Link className="btn" to={`/items`}>
        {t('button.back')}
      </Link>
      <Link className="btn" to={`/items/${props.itemId}/edit`}>
        {t('button.edit')}
      </Link>
    </>
  );
};

export default ItemView;

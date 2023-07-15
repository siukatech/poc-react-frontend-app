import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parseJSON, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { formatDate, formatDatetime } from '../../utils/date';

import classes from './ToyItem.module.css';

const ToyItem = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <li className="{classes.item}">
      <figure>
        <blockquote>
          <p>
            {t('toy.id')}: {props.id}
          </p>
          <p>
            {t('toy.title')}: {props.title}
          </p>
          <p>
            {t('toy.lastModifiedDatetime')}:
            {
              // no need to parseJSON because this handled in lib/api
              //format(props.lastModifiedDatetime, 'yyyy-MM-dd HH:mm:ss')
              //format(props.lastModifiedDatetime, 'yyyy-MM-dd HH:mm:ss')
              formatDatetime(props.lastModifiedDatetime)
            }
          </p>
          <p>
            {t('toy.versionNo')}: {props.versionNo}
          </p>
        </blockquote>
        <figcaption>
          {t('toy.purchasedDate')}:{' '}
          {
            //format(props.purchasedDate, 'yyyy-MM-dd')
            formatDate(props.purchasedDate)
          }
        </figcaption>
      </figure>
      <Link className="btn" to={`/toys/${props.id}`}>
        {t('button.view-fullscreen')}
      </Link>
      <Link className="btn" to={`/toys/${props.id}/edit`}>
        {t('button.edit')}
      </Link>
    </li>
  );
};

export default ToyItem;

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Grid,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Paper,
} from '@mui/material';

import useHttp, { HttpReducerStateStatus } from '../../../frameworks/https/hooks/use-http';
import {
  formatDate,
  formatDatetime,
  DATE_FORMAT_DEFAULT,
  DATE_TIME_FORMAT_DEFAULT,
} from '../../../frameworks/app/utils/date';
import { IItem } from '../../../features/item/models';
import { getSingleItem } from '../services/ItemService';
import ItemDetail from '../../../features/item/components/ItemDetail';

const ViewItem = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { itemId } = params;

  const { request, status, error, data: itemObj } = useHttp(getSingleItem);

  useEffect(() => {
    request(itemId);
  }, [request]);

  return (
    <>
      {status == HttpReducerStateStatus.COMPLETED && (
        <ItemDetail itemObj={itemObj} defaultExpanded={true} ></ItemDetail>
      )}
    </>
  );
};

export default ViewItem;

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
import useHttp, { HttpReducerStateStatus } from '../../../framework/https/hooks/use-http';

import {
  formatDate,
  formatDatetime,
  DATE_FORMAT_DEFAULT,
  DATE_TIME_FORMAT_DEFAULT,
} from '../../../framework/utils/date';

import type { Item } from '../models';

const ItemDetail = ({
  itemObj,
  defaultExpanded,
  minHeight = 'auto',
}: {
  itemObj: Item;
  defaultExpanded: boolean;
  minHeight?: number | string;
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Paper>
          <Accordion
            sx={{ minHeight: minHeight }}
            defaultExpanded={defaultExpanded}
          >
            <AccordionSummary>
              <Typography data-testid="item-name">
                {t('item.name')}: {itemObj?.name} (id:{itemObj?.id}, v:{itemObj?.versionNo})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t('item.purchasedDate')}:{' '}
                {formatDatetime(itemObj?.purchasedDate)}
              </Typography>
              <Typography>
                {t('item.lastModifiedDatetime')}(.toString):
                {itemObj?.lastModifiedDatetime?.toString()}
              </Typography>
              <Typography>
                {t('item.lastModifiedDatetime')}(.toDateString):
                {itemObj?.lastModifiedDatetime?.toDateString()}
              </Typography>
              <Typography>
                {t('item.lastModifiedDatetime')}(.toISOString):
                {itemObj?.lastModifiedDatetime?.toISOString()}
              </Typography>
              <Typography>
                {t('item.lastModifiedDatetime')}(formateDatetime):
                {formatDatetime(itemObj?.lastModifiedDatetime)}
              </Typography>
              <Typography>
                {t('item.lastModifiedDatetime')}(formateDatetime, pattern ZZZ):
                {formatDatetime(itemObj?.lastModifiedDatetime, 'yyyy-MM-dd HH:mm:ss zzz')}
              </Typography>
              <Typography>
                {t('item.lastModifiedDatetime')}(formateDatetime, pattern XXX):
                {formatDatetime(itemObj?.lastModifiedDatetime, 'yyyy-MM-dd HH:mm:ssXXX')}
              </Typography>
              <Typography>
                {t('item.versionNo')}: {itemObj.versionNo}
              </Typography>
            </AccordionDetails>
            <AccordionActions>
              <Button
                variant="outlined"
                onClick={() => navigate(`/items/${itemObj?.id}/edit`)}
              >
                {t('button.edit')}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                type="reset"
                onClick={() => navigate(-1)}
              >
                {t('button.back')}
              </Button>
            </AccordionActions>
          </Accordion>
        </Paper>
      </Box>
    </>
  );
};

export default ItemDetail;

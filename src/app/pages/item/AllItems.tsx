import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
import { Masonry } from '@mui/lab';

import { formatDate, formatDatetime } from '../../../base/utils/date';
import { getAllItems } from '../../services/ItemService';
import ItemDetail from '../../components/item/ItemDetail';

type Item = {
  id: number;
  name: string;
  purchasedDate: Date;
  lastModifiedDatetime: Date;
  versionNo: number;
};

const minHeights: number[] = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];
const resolveMinHeight: (idx: number) => number = (idx: number) => {
  let minHeight = 0;
  if (idx < minHeights.length) {
    minHeight = minHeights[idx];
  } else {
    const remaining: number = idx % minHeights.length;
    // console.log(
    //   'resolveMinHeight - idx: [' + idx + '], remaining: [' + remaining + ']'
    // );
    minHeight = minHeights[remaining];
  }
  return minHeight;
};

const AllItems = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState<null | Item[]>(null);

  useEffect(() => {
    // axiosService
    //   .get('http://localhost:4000/user/fav-movies')
    //   .then((response) => {
    //     setMovies(response.data);
    //   });

    // useEffect async
    // Reference:
    // https://devtrium.com/posts/async-functions-useeffect
    const fetchData = async () => {
      const data = await getAllItems();
      setItems(data);
    };
    fetchData().catch((err) => {
      console.error('AllItem - useEffect - err: ', err);
    });
  }, []);

  return (
    <>
      {items && (
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
          {items.map((itemObj, idx) => (
            <ItemDetail
              key={idx}
              itemObj={itemObj}
              defaultExpanded={false}
              minHeight={resolveMinHeight(idx)}
            ></ItemDetail>
          ))}
        </Masonry>
      )}
      {/* <Grid container spacing={2}>
        {items.map((itemObj, idx) => (
          <Grid item>
            <Card variant="outlined">
              <CardContent>
                <Typography>
                  {t('item.name')}: {itemObj.name} ({itemObj.id})
                </Typography>
                <Typography>
                  {t('item.purchasedDate')}:{' '}
                  {formatDatetime(itemObj.purchasedDate)}
                </Typography>
                <Typography>
                  {t('item.lastModifiedDatetime')}:
                  {formatDatetime(itemObj.lastModifiedDatetime)}
                </Typography>
                <Typography>
                  {t('item.versionNo')}: {itemObj.versionNo}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">{t('button.edit')}</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};

export default AllItems;

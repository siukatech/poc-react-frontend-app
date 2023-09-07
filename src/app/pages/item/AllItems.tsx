import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDate, formatDatetime } from '../../../base/utils/date';

import { getAllItems } from '../../services/ItemService';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Item = {
  id: number;
  name: string;
  purchasedDate: Date;
  lastModifiedDatetime: Date;
  versionNo: number;
};

const AllItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { t, i18n } = useTranslation();

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
    fetchData().catch(console.error);
  }, []);
  return (
    <>
      <Grid container spacing={2}>
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
      </Grid>
    </>
  );
};

export default AllItems;

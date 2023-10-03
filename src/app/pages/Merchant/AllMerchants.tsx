import { Box, Divider, Grid, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IMerchant } from '../../components/Merchant/Model';
import MerchantCard from '../../components/Merchant/MerchantCard';
import { Fragment } from 'react';

const merchants: IMerchant[] = [
  { id: 1, code: '1', name: '精品', description: '', shops: [] },
  { id: 2, code: '2', name: '孤注一扭', description: '', shops: [] },
  { id: 3, code: '3', name: 'Carousell', description: '', shops: [] },
  { id: 4, code: '4', name: 'G Point', description: '', shops: [] },
  { id: 5, code: '5', name: '五月玩具', description: '', shops: [] },
  { id: 6, code: '6', name: '爆米', description: '', shops: [] },
  { id: 7, code: '7', name: '玩具模型倉', description: '', shops: [] },
];

const AllMerchants = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Box
        sx={{
          // width: '70%'
          width: '100%',
          marginRight: 'auto',
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: 'auto',
            overflowX: 'auto',
          }}
        >
          {merchants.map((merchant, idx) => (
            <Fragment key={`key-merchant-1-${idx}`}>
              <MerchantCard
                key={`key-merchant-2-${idx}`}
                merchant={merchant}
                buttonText={t('button.view')}
                sx={{
                  p: 1,
                  m: 1,
                  width: 220,
                }}
                buttonOnClick={() => {}}
              />
            </Fragment>
          ))}
        </Stack>
      </Box>
      <Divider />
      <Grid container sx={{ justifyContent: 'center' }}>
        {merchants.map((merchant, idx) => (
          <Fragment key={`key-merchant-1-${idx}`}>
            <Grid item sx={{ pb: 2 }}>
              <MerchantCard
                key={`key-merchant-2-${idx}`}
                merchant={merchant}
                buttonText={t('button.view')}
                sx={{
                  p: 1,
                  m: 1,
                  width: 220,
                }}
                buttonOnClick={() => {}}
              />
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default AllMerchants;

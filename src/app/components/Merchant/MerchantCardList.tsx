import React, { useState, Fragment } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Grid,
  Stack,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  CssBaseline,
} from '@mui/material';

import { IMerchant } from '../../components/Merchant/Model';
import MerchantCard from './MerchantCard';
import { TFunction } from 'i18next';
import ScrollBox from '../UI/ScollBox/ScrollBox';

type TypeHandleCardButtonClick = (
  evt: React.MouseEvent,
  merchant: IMerchant
) => void;

const merchantCardJsx = (
  merchant: IMerchant,
  idx: number,
  t: TFunction,
  handleCardButtonClick: TypeHandleCardButtonClick
) => {
  return (
    <MerchantCard
      key={`key-merchant-2-${idx}`}
      merchant={merchant}
      buttonText={t('button.view')}
      sx={{
        p: 1,
        m: 1,
        width: 220,
        // height: 300,
      }}
      buttonOnClick={(evt) => handleCardButtonClick(evt, merchant)}
    />
  );
};

type MerchantCardListProps = {
  merchants: IMerchant[];
  handleCardButtonClick: TypeHandleCardButtonClick;
};

const MerchantCardList: React.FC<MerchantCardListProps> = ({
  merchants,
  handleCardButtonClick,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {merchants && (
        <>
          <Box
            sx={{
              // position: 'relative',
              width: '100%',
              overflow: 'hidden',
              // height: 'calc(100% - 80px)',
            }}
          >
            <Box
              sx={{
                // width: '70%'
                // width: '100%',
                width: '96vw',
                marginRight: 'auto',
                overflowY: 'hidden',
                overflowX: 'scroll',
                boxSizing: 'border-box',
                // ['-ms-overflow-style']: 'none',
                // overflow: '-moz-scrollbars-none',
                pb: 2,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  // width: 'auto',
                  // height: '100%',
                  // overflowX: 'auto',
                  display: 'inline-flex',
                  // mb: 2,
                }}
              >
                {merchants.map((merchant, idx) => (
                  <Fragment key={`key-merchant-stack-1-${idx}`}>
                    {merchantCardJsx(merchant, idx, t, handleCardButtonClick)}
                  </Fragment>
                ))}
              </Stack>
            </Box>
          </Box>
          <Divider />
          <Grid container sx={{ justifyContent: 'center' }}>
            {merchants.map((merchant, idx) => (
              <Fragment key={`key-merchant-grid-1-${idx}`}>
                <Grid item sx={{ pb: 2 }}>
                  {merchantCardJsx(merchant, idx, t, handleCardButtonClick)}
                </Grid>
              </Fragment>
            ))}
          </Grid>
          {/* <Divider />
          <ImageList
            cols={5}
            sx={{
              gridAutoFlow: 'row',
              // gridAutoFlow: 'column',
              // gridTemplateColumns:
              //   'repeat(auto-fit, minmax(160px,1fr)) !important',
              // gridAutoColumns: 'minmax(160px, 1fr)',
            }}
          >
            {merchants.map((merchant, idx) => (
              <Fragment key={`key-merchant-imageList-1-${idx}`}>
                <ImageListItem>
                  <ImageListItemBar title={merchant.name} />
                  {merchantCardJsx(merchant, idx, t, handleCardButtonClick)}
                </ImageListItem>
              </Fragment>
            ))}
          </ImageList> */}
          {/* <Divider />
          <ScrollBox>
            {merchants.map((merchant, idx) => (
              <Fragment key={`key-merchant-scrollbox-1-${idx}`}>
                {merchantCardJsx(merchant, idx, t, handleCardButtonClick)}
              </Fragment>
            ))}
          </ScrollBox> */}
        </>
      )}
      <Box>&nbsp;</Box>
    </>
  );
};

export default MerchantCardList;

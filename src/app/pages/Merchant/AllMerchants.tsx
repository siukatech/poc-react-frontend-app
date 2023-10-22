import { Fragment, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useQuery } from '@tanstack/react-query';

import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

import { getAllMerchants } from '../../services/MerchantService';

import { IMerchant } from '../../components/Merchant/Model';
import MerchantCard from '../../components/Merchant/MerchantCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import MerchantCardList from '../../components/Merchant/MerchantCardList';

// const merchants: IMerchant[] = [
//   { id: 1, mid: '1', name: '精品', description: '', shops: [] },
//   { id: 2, mid: '2', name: '孤注一扭', description: '', shops: [] },
//   { id: 3, mid: '3', name: 'Carousell', description: '', shops: [] },
//   { id: 4, mid: '4', name: 'G Point', description: '', shops: [] },
//   { id: 5, mid: '5', name: '五月玩具', description: '', shops: [] },
//   { id: 6, mid: '6', name: '爆米', description: '', shops: [] },
//   { id: 7, mid: '7', name: '玩具模型倉', description: '', shops: [] },
// ];

const AllMerchants = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [merchants, setMerchants] = useState<IMerchant[]>([]);

  const {
    data: data1,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['merchantAll'],
    queryFn: async (queryContext) => {
      const data = await getAllMerchants();
      return data;
    },
  });

  useEffect(() => {
    if (data1 != null) {
      setMerchants(data1);
    }
  }, [data1]);

  const handleCardButtonClick = (
    evt: React.MouseEvent,
    merchant: IMerchant
  ) => {
    navigate(`/merchants/${merchant.id}`);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isSuccess && (
        <MerchantCardList
          merchants={merchants}
          handleCardButtonClick={handleCardButtonClick}
        />
      )}
      {/* <Typography>This is a test.</Typography> */}
    </>
  );
};

export default AllMerchants;

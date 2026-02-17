import { useState } from 'react';
import {
  Dialog,
  // SelectChangeEvent,
  Box,
  Typography,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material';
import type {
  SelectChangeEvent,
} from '@mui/material';
import type { Merchant, MerchantShopPrompt } from '../models';
import type { Shop } from '../../shop/models';

const resolveShopById = (shops: Shop[], mid: string) => {
  const results = shops.filter((shop, idx) => shop.mid === mid);
  if (results.length > 0) return results[0];
  else return null;
};

type MerchantShopPromptProps = {
  open: boolean;
  merchant: Merchant;
  onConfirm: (promptData: MerchantShopPrompt) => void;
  onClose: () => void;
};

const MerchantShopPrompt: React.FC<MerchantShopPromptProps> = ({
  open,
  merchant,
  onConfirm,
  onClose,
}) => {
  const [promptData, setPromptData] = useState<MerchantShopPrompt>({
    merchant: merchant,
    shop: {
      id: -1,
      mid: '',
      name: '',
      description: '',
    } as Shop,
  });

  const handleShopChange = (evt: SelectChangeEvent) => {
    const shop = resolveShopById(merchant.shops, merchant.mid);
    setPromptData({
      ...promptData,
      ['shop']: shop,
    } as MerchantShopPrompt);
  };

  const handlePromptSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onConfirm(promptData);
  };

  //prompt?

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
        <Box component="form" onSubmit={handlePromptSubmit}>
          <Typography variant="h4" sx={{ m: 1, p: 1 }} />
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="shop-select-label">Shop list</InputLabel>
              <Select
                labelId={`shop-select-lable`}
                id={`shop-select-lable`}
                label="Select shop of periodic filing"
                value={''}
                onChange={handleShopChange}
              >
                {merchant.shops.map((shop, idx) => (
                  <MenuItem key={`key-merchant-shop-prompt-1-${idx}`}>
                    {shop.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button>Confirm</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default MerchantShopPrompt;

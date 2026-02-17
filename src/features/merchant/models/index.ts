import type { Shop } from "../../shop/models";

interface Merchant {
  id: number;
  mid: string;
  name: string;
  description?: string;
  status: string;
  shops: Shop[];
}

interface MerchantCard {}

interface MerchantShopPrompt {
  merchant: Merchant;
  shop: Shop;
}

export type { 
  Merchant, 
  MerchantCard,
  MerchantShopPrompt,
};


import { IShop } from "../../shop/models";

interface IMerchant {
  id: number;
  mid: string;
  name: string;
  description?: string;
  status: string;
  shops: IShop[];
}

interface IMerchantCard {}

interface IMerchantShopPrompt {
  merchant: IMerchant;
  shop: IShop;
}

export type { 
  IMerchant, 
  IMerchantCard,
  IMerchantShopPrompt,
};


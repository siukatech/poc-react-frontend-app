import { IShop } from "../../Shop/Model";

interface IMerchant {
  id: number;
  code: string;
  name: string;
  description?: string;
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


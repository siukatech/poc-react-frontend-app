import MerchantCard from './components/MerchantCard';
import MerchantCardList from './components/MerchantCardList';
import MerchantShopPrompt from './components/MerchantShopPrompt';

import { IMerchant, IMerchantCard, IMerchantShopPrompt } from './models';

import AllMerchants from './pages/AllMerchants';
import EditMerchant from './pages/EditMerchant';
import ViewMerchant from './pages/ViewMerchant';
import {
  rjsf_dataSchema,
  rjsf_uiSchema,
  jsonforms_dataSchema,
  jsonforms_uiSchema,
} from './rjsf';

import {
  getAllMerchants,
  getPagedMerchants,
  getSingleMerchant,
  addSingleMerchant,
  updateSingleMerchant,
  deleteSingleMerchant,
} from './services/MerchantService';

export {
  MerchantCard,
  MerchantCardList,
  MerchantShopPrompt,
  AllMerchants,
  EditMerchant,
  ViewMerchant,
  rjsf_dataSchema,
  rjsf_uiSchema,
  jsonforms_dataSchema,
  jsonforms_uiSchema,
  getAllMerchants,
  getPagedMerchants,
  getSingleMerchant,
  addSingleMerchant,
  updateSingleMerchant,
  deleteSingleMerchant,
};
export type { IMerchant, IMerchantCard, IMerchantShopPrompt };

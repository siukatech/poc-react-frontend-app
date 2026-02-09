import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import { IItem } from './models';
import AllItems from './pages/AllItems';
import EditItem from './pages/EditItem';
import ViewItem from './pages/ViewItem';
import {
  getAllItems,
  getPagedItems,
  getSingleItem,
  addSingleItem,
  updateSingleItem,
  deleteSingleItem,
} from './services/ItemService';

export {
  ItemDetail,
  ItemForm,
  AllItems,
  EditItem,
  ViewItem,
  getAllItems,
  getPagedItems,
  getSingleItem,
  addSingleItem,
  updateSingleItem,
  deleteSingleItem,
};
export type { IItem };

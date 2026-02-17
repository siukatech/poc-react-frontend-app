
import AttachmentPane from './components/AttachmentPane';

import type { IAttachmentObj } from './models';

import {
  uploadAttachmentObj,
  uploadAttachmentObjList,
  getAttachmentObj,
  downloadAttachmentObj,
  deleteAttachmentObj,
} from './services/AttachmentService';

export type {
  IAttachmentObj
}
export {
  AttachmentPane,
  uploadAttachmentObj,
  uploadAttachmentObjList,
  getAttachmentObj,
  downloadAttachmentObj,
  deleteAttachmentObj,
}

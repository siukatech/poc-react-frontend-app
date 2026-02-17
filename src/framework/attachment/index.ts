
import AttachmentPane from './components/AttachmentPane';

import type { AttachmentObj } from './models';

import {
  uploadAttachmentObj,
  uploadAttachmentObjList,
  getAttachmentObj,
  downloadAttachmentObj,
  deleteAttachmentObj,
} from './services/AttachmentService';

export type {
  AttachmentObj
}
export {
  AttachmentPane,
  uploadAttachmentObj,
  uploadAttachmentObjList,
  getAttachmentObj,
  downloadAttachmentObj,
  deleteAttachmentObj,
}

import { UUID } from 'uuidv7';

interface AttachmentObj {
  id?: UUID;
  fileName: string;
  contentType: string;
  fileSize?: number;
  fileContent?: Blob;
  targetFile?: File;
  isUploaded?: boolean;
  uploadErr?: any;
}

export type { AttachmentObj };

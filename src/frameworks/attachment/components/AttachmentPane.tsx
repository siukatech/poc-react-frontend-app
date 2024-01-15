import { Fragment, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { IAttachmentObj } from '../models';
import { styled } from '@mui/material/styles';
import {
  deleteAttachmentObj,
  downloadAttachmentObj,
  uploadAttachmentObjList,
} from '../services/AttachmentService';
import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { IconComponent } from '../../ui';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type AttachmentPaneProps = {
  readOnly?: boolean;
  attachmentObjList?: IAttachmentObj[];
  onAttachmentListChange: (
    attachmentObjList: IAttachmentObj[],
    isUploading: boolean
  ) => void;
};

const AttachmentPane: React.FC<AttachmentPaneProps> = ({
  readOnly,
  attachmentObjList,
  onAttachmentListChange,
}) => {
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null); // null is required for the VisuallyHiddenInput's ref
  const [valueList, setValueList] = useState<IAttachmentObj[]>(() => {
    let list: IAttachmentObj[] = [];
    list = attachmentObjList
      ? attachmentObjList.map((attachmentObj, idx) => {
          return {
            ...attachmentObj,
            isUploaded:
              attachmentObj.isUploaded != null
                ? attachmentObj.isUploaded
                : true,
          } as IAttachmentObj;
        })
      : [];
    return list;
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(() => {
    return readOnly != null ? readOnly : false;
  });
  const [valueErr, setValueErr] = useState<any>();

  useEffect(() => {
    let filteredList = valueList.filter(
      (attachmentObj) => attachmentObj.isUploaded === false
    );
    console.debug(
      `AttachmentPane - useEffect - 1 - filteredList.length: [${filteredList.length}], valueList: `,
      valueList
    );
    if (filteredList.length > 0) {
      console.debug(
        `AttachmentPane - useEffect - 2 - filteredList.length: [${filteredList.length}], valueList: `,
        valueList
      );

      // upload
      const uploadAttachment = async () => {
        console.debug(
          `AttachmentPane - useEffect - 3 - valueList: `,
          valueList
        );
        const updatedList = await uploadAttachmentObjList(valueList);
        console.debug(
          `AttachmentPane - useEffect - 4 - updatedList: `,
          updatedList
        );
        setValueList(updatedList);
        setIsUploading(false);
        if (fileInputRef.current && fileInputRef.current.value) {
          fileInputRef.current.value = '';
        }
      };
      uploadAttachment();
    } else {
      setIsUploading(false);
    }
    console.debug(
      `AttachmentPane - useEffect - 5 - filteredList.length: [${filteredList.length}], valueList: `,
      valueList
    );
    onAttachmentListChange(valueList, filteredList.length > 0);
  }, [valueList, isUploading]);

  const handleAttachmentChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = evt.target.files ? evt.target.files : [];
    console.debug(
      `AttachmentPane - handleAttachmentChange - targetFiles: `,
      targetFiles
    );
    setValueList((prevState) => {
      let valueList = prevState;
      const valueMap: any = valueList
        ? valueList.reduce(
            (accumulator, attachmentObj, idx) => ({
              ...accumulator,
              [attachmentObj.fileName]: attachmentObj.fileName,
            }),
            {}
          )
        : {};
      console.debug(
        `AttachmentPane - handleAttachmentChange - valueMap: `,
        valueMap
      );
      for (let ccc = 0; ccc < targetFiles.length; ccc++) {
        const targetFile = targetFiles[ccc];
        const valueMapTargetFile = valueMap[targetFile.name];
        console.debug(
          `AttachmentPane - handleAttachmentChange - valueMapTargetFile is null: [${
            valueMapTargetFile == null
          }], targetFile: `,
          targetFile
        );
        if (targetFile && valueMap[targetFile.name] == null) {
          valueList.push({
            fileName: targetFile.name,
            fileSize: targetFile.length,
            id: undefined,
            isUploaded: false,
            targetFile,
          } as IAttachmentObj);
        }
      }
      return valueList;
    });
    setIsUploading(true);
  };

  const handleAttachmentDownload = (
    attachmentObj: IAttachmentObj,
    idx: number
  ) => {
    const downloadFile = async (attachmentObj: IAttachmentObj) => {
      try {
        await downloadAttachmentObj(attachmentObj);
      } catch (err) {
        setValueErr(err);
      }
    };
    if (attachmentObj.isUploaded && attachmentObj.uploadErr == null) {
      downloadFile(attachmentObj);
    }
  };

  const handleAttachmentDelete = (
    attachmentObj: IAttachmentObj,
    idx: number
  ) => {
    const attachmentObjToDelete = valueList.at(idx);
    const clearFile = (idx: number) => {
      setValueList((prevState) => {
        let valueListPrev = prevState;
        valueListPrev.splice(idx, 1);
        let valueListNew: IAttachmentObj[] = [];
        for (let ccc = 0; ccc < valueListPrev.length; ccc++) {
          valueListNew.push(valueListPrev[ccc]);
        }
        return valueListNew;
      });
    };
    console.debug(
      `AttachmentPane - handleAttachmentDelete - idx: [${idx}], attachmentObj: `,
      attachmentObj
    );
    if (attachmentObj.isUploaded && !attachmentObj.uploadErr) {
      const deleteFile = async (attachmentObj: IAttachmentObj) => {
        const { data } = await deleteAttachmentObj(attachmentObj);
        return data;
      };
      deleteFile(attachmentObj).then((retData) => clearFile(idx));
    } else {
      clearFile(idx);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="body1">{t('upload.title')}</Typography>
      </Box>
      <List>
        {valueList.map((attachmentObj: IAttachmentObj, idx: number) => {
          console.debug(
            `AttachmentPane - return - idx: [${idx}], attachmentObj: `,
            attachmentObj
          );
          return (
            <Fragment key={`key-attachment-${idx}`}>
              <ListItem sx={{ pl: 0 }}>
                {attachmentObj.isUploaded && (
                  <Link
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleAttachmentDownload(attachmentObj, idx)}
                  >
                    {attachmentObj.fileName}
                  </Link>
                )}
                {!attachmentObj.isUploaded && (
                  <Typography variant="body1">
                    {attachmentObj.fileName}...
                  </Typography>
                )}
                {!isReadOnly && !isUploading && attachmentObj.isUploaded && (
                  <ListItemIcon
                    sx={{ minWidth: 'auto', pl: 0.5, cursor: 'pointer' }}
                    onClick={() => handleAttachmentDelete(attachmentObj, idx)}
                  >
                    <IconComponent name="DeleteOutline" />
                  </ListItemIcon>
                )}
                {!isReadOnly &&
                  attachmentObj.isUploaded &&
                  attachmentObj.uploadErr && (
                    <ListItemIcon
                      sx={{ minWidth: 'auto', pl: 0.5, cursor: 'pointer' }}
                      title={attachmentObj.uploadErr}
                    >
                      <IconComponent name="ErrorOutline" />
                    </ListItemIcon>
                  )}
              </ListItem>
            </Fragment>
          );
        })}
      </List>
      <Button component="label" disabled={isUploading || isReadOnly}>
        <IconComponent name="UploadFile" sx={{ pr: 0.5 }} />
        <Typography variant="body1">{t('button.upload')}</Typography>
        <VisuallyHiddenInput
          type="file"
          onChange={handleAttachmentChange}
          ref={fileInputRef}
          multiple
        />
      </Button>
    </>
  );
};

export default AttachmentPane;

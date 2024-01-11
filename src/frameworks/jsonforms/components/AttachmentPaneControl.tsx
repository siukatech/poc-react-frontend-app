import { useState } from 'react';

import { Hidden } from '@mui/material';

import { ControlProps, OwnPropsOfEnum } from '@jsonforms/core';

import AttachmentPane from '../../attachment/components/AttachmentPane';
import { IAttachmentObj } from '../../attachment/models';

type AttachmentPaneControlProps = {};

const AttachmentPaneControl = (
  props: ControlProps & AttachmentPaneControlProps
) => {
  const {
    rootSchema: dataSchema,
    schema: propertySchema,
    uischema: propertyUischema,
    data,
    id,
    enabled,
    path,
    handleChange,
    config,
    label,
    required,
    visible,
  } = props;

  const isReadOnly = !enabled;

  const [values, setValues] = useState<undefined | IAttachmentObj[]>(() => {
    return data;
  });

  const handleAttachmentListChange = (
    attachmentObjList: IAttachmentObj[],
    isUploading: boolean
  ) => {
    if (!isUploading) {
      handleChange(path, attachmentObjList);
    }
  };

  return (
    <>
      <Hidden xsUp={!visible}>
        <AttachmentPane
          readOnly={isReadOnly}
          attachmentObjList={values}
          onAttachmentListChange={handleAttachmentListChange}
        />
      </Hidden>
    </>
  );
};

export default AttachmentPaneControl;

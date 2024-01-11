import { useState } from 'react';
import { Divider, Typography } from '@mui/material';
import AttachmentPane from '../../../frameworks/attachment/components/AttachmentPane';
import { IAttachmentObj } from '../../../frameworks/attachment/models';
import { useAuthContext } from '../../auth';

const ContentLong = () => {
  const style = {
    // marginTop: '150px',
    // marginBottom: '150px',
  };

  const { user } = useAuthContext();

  const [attachmentObjList, setAttachmentObjList] = useState<
    undefined | IAttachmentObj[]
  >(undefined);

  const handleAttachmentListChange = (
    attachmentObjList: IAttachmentObj[],
    isUploading: boolean
  ) => {
    console.debug(
      `ContentLong - handleAttachmentListChange - isUploading: [${isUploading}], attachmentObjList: `,
      attachmentObjList
    );
  };

  return (
    <>
      {user && (
        <>
          <AttachmentPane
            attachmentObjList={attachmentObjList}
            onAttachmentListChange={handleAttachmentListChange}
          />
          <Divider />
        </>
      )}
      {[...new Array(12)].map((ccc, idx) => {
        return (
          <Typography
            component="div"
            key={`${ccc}--${idx}`}
            sx={{ paddingBottom: '12px' }}
          >
            <div>
              <p>{`Paragraph ${idx}`}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Rhoncus dolor purus non enim praesent elementum facilisis leo
                vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                hendrerit gravida rutrum quisque non tellus. Convallis convallis
                tellus id interdum velit laoreet id donec ultrices. Odio morbi
                quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod
                quis viverra nibh cras. Metus vulputate eu scelerisque felis
                imperdiet proin fermentum leo. Mauris commodo quis imperdiet
                massa tincidunt. Cras tincidunt lobortis feugiat vivamus at
                augue. At augue eget arcu dictum varius duis at consectetur
                lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
              </p>
            </div>
          </Typography>
        );
      })}
    </>
  );
};

export default ContentLong;

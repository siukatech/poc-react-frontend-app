import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { format } from 'date-fns';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Stack,
  TextField,
  FormControl,
  FormHelperText,
  ButtonGroup,
  InputLabel,
  Typography,
  Divider,
  Grid,
} from '@mui/material';

import { DateField, DatePicker } from '@mui/x-date-pickers';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';

import useHttp, { HttpReducerStateStatus } from '../../../base/hooks/use-http';
import {
  formatDate,
  formatDatetime,
  DATE_FORMAT_DEFAULT,
  DATE_TIME_FORMAT_DEFAULT,
} from '../../../base/utils/date';
import { IItem } from '../../components/Item/Model';
import {
  getSingleItem,
  updateSingleItem,
  addSingleItem,
} from '../../services/ItemService';
import DialogPrompt from '../../components/UI/DialogPrompt';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ItemForm from '../../components/Item/ItemForm';

const formFieldSxDefault = { m: 1, width: '80%' };

const EditItem = (props: any) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { itemId } = params;
  console.log('EditItem - itemId: ', itemId);

  const [showPutErrorDialog, setShowPutErrorDialog] = useState(true);

  const {
    request: getRequest,
    status: getStatus,
    error: getError,
    data: itemObj,
  } = useHttp(getSingleItem);

  const {
    request: postRequest,
    status: postStatus,
    error: postError,
    data: itemAdded,
  } = useHttp(addSingleItem);

  const {
    request: putRequest,
    status: putStatus,
    error: putError,
    data: itemUpdated,
  } = useHttp(updateSingleItem);

  useEffect(() => {
    getRequest(itemId);
  }, [getRequest]);

  // const handleFormSubmit = async (
  //   evt: React.FormEvent<HTMLFormElement>
  // ): Promise<any> => {
  //   evt.preventDefault();
  // };
  const handleFormSubmit = (itemRec: IItem) => {
    // setShowConfirmDialog(true);
    // itemRec.versionNo = 1;
    // itemRec.versionNo = loadedObj.versionNo;  // temporary added here, should prepare in Form
    console.log('EditItem - handleFormSubmit - itemRec: ', itemRec);
    putRequest(itemRec);
  };

  // const handleFormReset = (evt: React.MouseEvent<HTMLButtonElement>) => {
  //   evt.preventDefault();
  //   evt.currentTarget.form?.reset();
  //   setIsDirty(false);
  // };

  // const handleFormFocus = (
  //   evt: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   //navigate(-1);
  //   //setIsDirty(true);
  //   console.log(
  //     'EditItem - handleFormFocus - evt.target.value: ',
  //     evt.target.value
  //   );
  //   setIsDirty((prevState) => {
  //     console.log(
  //       'EditItem - handleFormFocus - prevState: [' + prevState + ']'
  //     );
  //     if (prevState === true) {
  //       return prevState;
  //     } else return true;
  //   });
  // };

  // const handleTextFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = evt.target;
  //   setItemObj({
  //     ...itemObj,
  //     [name]: value,
  //   });
  // };

  // //
  // // Reference:
  // // https://stackoverflow.com/a/69440640
  // const handleDateFieldChange = (name: string, value: any) => {
  //   setItemObj({
  //     ...itemObj,
  //     [name]: value,
  //   });
  // };

  const handleOkDialogPrompt = (evt: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/login`);
  };

  const handleFormPutError = (putError: any): string => {
    return '';
  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={4}>
              <Typography component={'div'}>
                getStatus: [{getStatus}]
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography component={'div'}>getError: [{JSON.stringify(getError)}]</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography component={'div'}>
                itemObj: [{itemObj?.id}]
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography component={'div'}>
                putStatus: [{putStatus}]
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography component={'div'}>putError: [{JSON.stringify(putError)}]</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography component={'div'}>
                itemObj: [{itemObj?.versionNo}]
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      {putStatus === HttpReducerStateStatus.ERROR && showPutErrorDialog && (
        <DialogPrompt
          open={true}
          title={t('error.update.failed')}
          // message={''}
          onOk={() => setShowPutErrorDialog(false)}
        ></DialogPrompt>
      )}
      {putStatus === HttpReducerStateStatus.COMPLETED && (
        <DialogPrompt
          open={true}
          title={t('item.update.completed')}
          // message={''}
          onOk={() => navigate(`/items`)}
        ></DialogPrompt>
      )}
      {getStatus === HttpReducerStateStatus.PENDING && <LoadingSpinner />}
      {getError != null && (
        <DialogPrompt
          open={true}
          title={t('error.login.expired')}
          message={getError}
          onOk={() => navigate(`/login`)}
        />
      )}
      {getStatus === HttpReducerStateStatus.COMPLETED && (
        <ItemForm
          itemObj={itemObj}
          onSubmit={handleFormSubmit}
          // handleTextFieldChange={handleTextFieldChange}
          // handleDateFieldChange={handleDateFieldChange}
        ></ItemForm>
      )}
    </>
  );
};

export default EditItem;

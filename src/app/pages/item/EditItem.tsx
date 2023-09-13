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
import { IItemObj } from '../../models/item/IItemObj';
import {
  getSingleItem,
  updateSingleItem,
  addSingleItem,
} from '../../services/ItemService';
import DialogPrompt from '../../components/ui/DialogPrompt';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ItemForm from '../../components/item/ItemForm';

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

  // const submitFormHandler = async (
  //   evt: React.FormEvent<HTMLFormElement>
  // ): Promise<any> => {
  //   evt.preventDefault();
  // };
  const submitFormHandler = (itemRec: IItemObj) => {
    // setShowConfirmDialog(true);
    // itemRec.versionNo = 1;
    // itemRec.versionNo = loadedObj.versionNo;  // temporary added here, should prepare in Form
    console.log('EditItem - submitFormHandler - itemRec: ', itemRec);
    putRequest(itemRec);
  };

  // const resetFormHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
  //   evt.preventDefault();
  //   evt.currentTarget.form?.reset();
  //   setIsDirty(false);
  // };

  // const focusFormHandler = (
  //   evt: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   //navigate(-1);
  //   //setIsDirty(true);
  //   console.log(
  //     'EditItem - focusFormHandler - evt.target.value: ',
  //     evt.target.value
  //   );
  //   setIsDirty((prevState) => {
  //     console.log(
  //       'EditItem - focusFormHandler - prevState: [' + prevState + ']'
  //     );
  //     if (prevState === true) {
  //       return prevState;
  //     } else return true;
  //   });
  // };

  // const changeTextFieldHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = evt.target;
  //   setItemObj({
  //     ...itemObj,
  //     [name]: value,
  //   });
  // };

  // // https://stackoverflow.com/a/69440640
  // const changeDateFieldHandler = (name: string, value: any) => {
  //   setItemObj({
  //     ...itemObj,
  //     [name]: value,
  //   });
  // };

  const navigateokDialogPromptHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/login`);
  };

  const formPutErrorMessageHandler = (putError: any): string => {
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
          onSubmit={submitFormHandler}
          // changeTextFieldHandler={changeTextFieldHandler}
          // changeDateFieldHandler={changeDateFieldHandler}
        ></ItemForm>
      )}
    </>
  );
};

export default EditItem;

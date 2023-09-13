import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  unstable_usePrompt as usePrompt,
  unstable_useBlocker as useBlocker,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { format } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

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
  Container,
  Grid,
} from '@mui/material';

import { DateField, DatePicker } from '@mui/x-date-pickers';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';

import {
  formatDate,
  formatDatetime,
  DATE_FORMAT_DEFAULT,
  DATE_TIME_FORMAT_DEFAULT,
  TIMEZONE_DEFAULT,
} from '../../../base/utils/date';
import { IItem } from './Model';
import { getSingleItem } from '../../services/ItemService';
import DialogPrompt from '../UI/DialogPrompt';
import LoadingSpinner from '../UI/LoadingSpinner';
import UnloadPrompt from '../UI/UnloadPrompt';

const formFieldSxDefault = { m: 1, width: '90%' };

const ItemForm = ({
  itemObj,
  onSubmit,
}: // changeTextFieldHandler,
// changeDateFieldHandler,
{
  itemObj: IItem;
  onSubmit: (itemRec: IItem) => void;
  // changeTextFieldHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  // changeDateFieldHandler: (name: string, value: any) => void;
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isDirty, setIsDirty] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>();
  const purchasedDateInputRef = useRef();

  const [itemRec, setItemRec] = useState(itemObj);
  const [nameVal, setNameVal] = useState<string>('');
  // const [purchasedDateVal, setPurchasedDateVal] = useState<null | string>();
  const [purchasedDateVal, setPurchasedDateVal] = useState<Date>(new Date());

  const blocker = useBlocker(isDirty);

  const submitFormHandler = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setIsDirty(false);

    onSubmit(itemRec);
  };

  const resetFormHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.currentTarget.form?.reset();
    setIsDirty(false);
  };

  const focusFormHandler = (
    evt: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //navigate(-1);
    //setIsDirty(true);
    console.log(
      'ItemForm - focusFormHandler - evt.target.value: ',
      evt.target.value
    );
    // setIsDirty((prevState) => {
    //   console.log(
    //     'ItemForm - focusFormHandler - prevState: [' + prevState + ']'
    //   );
    //   if (prevState === true) {
    //     return prevState;
    //   } else return true;
    // });
    console.log('ItemForm - focusFormHandler - blocker: ', blocker);
  };

  const changeTextFieldHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    //
    // Reference:
    // https://stackoverflow.com/a/69198602
    // fixes of Element implicitly has an 'any' type because expression of type 'string' can't be used to index
    const oldVal = itemRec[name as keyof IItem];
    if (oldVal != value) {
      setItemRec({
        ...itemRec,
        [name]: value,
      });
      setIsDirty(true);
    }
  };

  // Reference:
  // https://stackoverflow.com/a/69440640
  const changeDateFieldHandler = (name: string, value: any) => {
    const timezoneOffset = getTimezoneOffset(TIMEZONE_DEFAULT, value);
    const valueWithTimezoneOffset = console.log(
      'ItemForm - changeDateFieldHandler - name: [' +
        name +
        '], value: [' +
        value +
        ']'
    );
    setItemRec({
      ...itemRec,
      [name]: value,
    });
    setIsDirty(true);
  };

  return (
    <>
      <UnloadPrompt
        blocker={blocker}
        message={t('warning.beforeunload')}
        isDirty={isDirty}
      />
      {itemRec && (
        <Card>
          <Box
            component="form"
            onSubmit={submitFormHandler}
            // sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1 }}
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              p: 1,
              m: 1,
            }}
            // ref={loginFormRef}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ ...formFieldSxDefault }}>
                  <legend>{t('item.form')}</legend>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  // label={t('form.isDirty') + '[' + isDirty + ']'}
                  label={t('form.isDirty')}
                  sx={{ ...formFieldSxDefault }}
                  // defaultValue={isDirty || ''}
                  value={new String(isDirty)}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label={t('item.id')}
                  sx={{ ...formFieldSxDefault }}
                  // defaultValue={itemObj?.id || ''}
                  value={itemObj?.id || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label={t('item.versionNo')}
                  sx={{ ...formFieldSxDefault }}
                  // defaultValue={itemObj?.versionNo || ''}
                  value={itemObj?.versionNo || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label={t('item.lastModifiedDatetime')}
                  sx={{ ...formFieldSxDefault }}
                  // type="date"
                  // defaultValue={formatDatetime(
                  //   itemObj?.lastModifiedDatetime,
                  //   'yyyy-MM-dd hh:mm:24'
                  // ) || ''}
                  value={
                    formatDatetime(
                      itemObj?.lastModifiedDatetime,
                      DATE_TIME_FORMAT_DEFAULT
                    ) || ''
                  }
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={10}>
                <Divider />
              </Grid>
              <Grid item xs={10}>
                <Stack sx={{ width: '100%' }}>
                  <TextField
                    label={t('item.name')}
                    inputRef={nameInputRef}
                    id="name"
                    name="name"
                    helperText={t('item.name.helperText')}
                    sx={{ ...formFieldSxDefault }}
                    onFocus={focusFormHandler}
                    // defaultValue={itemObj?.name}
                    // value={nameVal || ''}
                    value={itemRec?.name}
                    // onChange={(evt) => {
                    //   // setNameVal(evt.target.value);
                    //   setItemObj({ ...itemObj, name: evt.target.value });
                    // }}
                    onChange={changeTextFieldHandler}
                  />
                  <DatePicker
                    label={t('item.purchasedDate')}
                    // inputRef={purchasedDateInputRef}
                    // id="purchasedDate"
                    // name="purchasedDate"
                    // helperText={t('item.purchasedDate.helperText')}
                    sx={{ ...formFieldSxDefault }}
                    // defaultValue={itemObj?.purchasedDate}
                    // value={purchasedDateVal}
                    value={itemRec?.purchasedDate}
                    format={DATE_FORMAT_DEFAULT}
                    // onChange={(val) => {
                    //   // val != null ? setPurchasedDateVal(val) : void 0;
                    //   val != null
                    //     ? setItemObj({ ...itemObj, purchasedDate: val })
                    //     : void 0;
                    // }}
                    onChange={(val) =>
                      changeDateFieldHandler('purchasedDate', val)
                    }
                  />
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                    sx={{ m: 1 }}
                  >
                    <Button variant="outlined" color="primary" type="submit">
                      {t('button.save')}
                    </Button>
                    {/* <Button variant="outlined" color="secondary" type="button" onClick={resetFormHandler}>
              {t('button.reset')}
            </Button> */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      type="reset"
                      onClick={resetFormHandler}
                    >
                      {t('button.reset')}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      type="reset"
                      onClick={() => navigate(-1)}
                    >
                      {t('button.back')}
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}
    </>
  );
};

export default ItemForm;

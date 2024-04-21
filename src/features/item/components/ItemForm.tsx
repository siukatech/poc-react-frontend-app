import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  unstable_usePrompt as usePrompt,
  unstable_useBlocker as useBlocker,
  unstable_BlockerFunction as BlockerFunction,
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
} from '../../../frameworks/app/utils/date';
import { IItem } from '../models';
import { getSingleItem } from '../services/ItemService';
import DialogPrompt from '../../../frameworks/ui/components/DialogPrompt';
import LoadingSpinner from '../../../frameworks/ui/components/LoadingSpinner';
import UnloadPrompt from '../../../frameworks/ui/components/UnloadPrompt';

const formFieldSxDefault = { m: 1, width: '90%' };

const ItemForm = ({
  itemObj,
  onSubmit,
}: // handleTextFieldChange,
// handleDateFieldChange,
{
  itemObj: IItem;
  onSubmit: (itemRec: IItem) => void;
  // handleTextFieldChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  // handleDateFieldChange: (name: string, value: any) => void;
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

  const shouldBlock = useCallback<BlockerFunction>(({
    currentLocation,
    nextLocation,
    historyAction
  }) => {
    console.debug('ItemForm - shouldBlock - currentLocation: ', currentLocation);
    console.debug('ItemForm - shouldBlock - nextLocation: ', nextLocation);
    console.debug('ItemForm - shouldBlock - historyAction: ', historyAction);
    console.debug('ItemForm - shouldBlock - isDirty: ', isDirty);
    return isDirty;
  }, [isDirty]);

  // const blocker = useBlocker(isDirty);
  const blocker = useBlocker(shouldBlock);

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setIsDirty(false);

    onSubmit(itemRec);
  };

  const handleFormReset = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.currentTarget.form?.reset();
    setIsDirty(false);
  };

  const handleFormFocus = (
    evt: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //navigate(-1);
    //setIsDirty(true);
    // console.debug(
    //   'ItemForm - handleFormFocus - evt.target.value: ',
    //   evt.target.value
    // );
    // setIsDirty((prevState) => {
    //   console.debug(
    //     'ItemForm - handleFormFocus - prevState: [' + prevState + ']'
    //   );
    //   if (prevState === true) {
    //     return prevState;
    //   } else return true;
    // });
    // console.debug('ItemForm - handleFormFocus - blocker: ', blocker);
  };

  const handleTextFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleDateFieldChange = (name: string, value: any) => {
    const timezoneOffset = getTimezoneOffset(TIMEZONE_DEFAULT, value);
    // console.debug(
    //   'ItemForm - handleDateFieldChange - name: [' +
    //     name +
    //     '], value: [' +
    //     value +
    //     ']'
    // );
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
            onSubmit={handleFormSubmit}
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
                    onFocus={handleFormFocus}
                    // defaultValue={itemObj?.name}
                    // value={nameVal || ''}
                    value={itemRec?.name}
                    // onChange={(evt) => {
                    //   // setNameVal(evt.target.value);
                    //   setItemObj({ ...itemObj, name: evt.target.value });
                    // }}
                    onChange={handleTextFieldChange}
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
                      handleDateFieldChange('purchasedDate', val)
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
                    {/* <Button variant="outlined" color="secondary" type="button" onClick={handleFormReset}>
              {t('button.reset')}
            </Button> */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      type="reset"
                      onClick={handleFormReset}
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


# npm
## Libraries Installation

**Base**
```shell
npm i -S react-router-dom
npm i -S jwt-decode
npm i -S axios
npm i -S env-cmd
npm i -S date-fns date-fns-tz
npm i -S crypto-js jsencrypt randomstring
npm i -S i18next i18next-http-backend react-i18next
npm i -S uuidv7
```



**Others**
```shell
# dependencies for easy-scoll-box
npm i -S lodash
npm i --save-dev @types/lodash
```


**Fix of peerDependencies**  
```json
  ...
  },
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0"
  },
  "__fixes__": "https://github.com/facebook/create-react-app/issues/13080#issuecomment-1515280885",
  "overrides": {
    "react-scripts": {
      "typescript": "^5"
    }
  },
  "scripts": {
  ...
```



**MUI**
```shell
npm i -S @mui/material @emotion/react @emotion/styled
npm i -S @mui/icons-material
#npm i -S --legacy-peer-deps @mui/lab
#npm i -S --legacy-peer-deps @mui/x-date-pickers
npm i -S @mui/lab
npm i -S @mui/x-date-pickers
npm i -S @mui/utils
npm i -S @mui/x-data-grid
```



**Handle warning**  
```shell
# install deprecated package to dev by --save-dev
npm i --save-dev @babel/plugin-proposal-private-property-in-object

# downgrade typescript to 5.1.3 to prevent eslint error
npm i --save typescript@5.1.3
```



**Audit fix**  
***Reference:***  
https://github.com/facebook/create-react-app/issues/12132#issuecomment-1130249584  
Under `node -version` `16`, install the `@svgr/webpack@^6` manually.  
And modify the `package.json` as below.  

```shell
npm i -S @svgr/webpack@^6.3.1
```

```json
  ...
  },
  "overrides": {
    ...
    "@svgr/webpack": "$@svgr/webpack"
  },
  ...
  "devDependencies": {
    ...
    "@svgr/webpack": "^6.5.1"
  }
  ...
```



**Reference:**  
https://mui.com/material-ui/getting-started/installation/  
https://mui.com/material-ui/react-drawer/  
https://mui.com/material-ui/api/form-control/  
https://mui.com/material-ui/react-text-field/#input-adornments  
https://mui.com/material-ui/react-grid/  
https://mui.com/material-ui/material-icons/  




## JSON Schema Form
**rjsf**
react-jsonschema-form
```shell
npm i -S @rjsf/core @rjsf/utils
npm uninstall --save @rjsf/validator-ajv6
npm i -S @rjsf/validator-ajv8
npm i -S @rjsf/mui
```



**Readonly form implementation**  
Add a ThemeProvider to wrap the <Form/> component.  



**Reference:**  
https://jsonforms.discourse.group/t/switch-to-a-view-only-schema/403/4  
https://github.com/mingfang/jsonforms-demo/blob/master/src/index.tsx#L9  
https://github.com/rjsf-team/react-jsonschema-form/issues/1987#issuecomment-1147517375  





## Axios
**Reference:**  
https://github.com/chinesedfan/You-Dont-Know-Axios#interceptors  
https://www.youtube.com/watch?v=X9hnBtYQx0A  



## Run
Execute `npm run start` or `npm run start:dev` commands to start the project.  


**DEV**
```shell
npm run start:dev
npm run build:dev
npm run test
```

**SIT**
```shell
npm run start:sit
npm run build:sit
```


## webpack server fix ##
Downgrade to avoid the overlay exception message.  

```shell
npm i webpack-dev-server@4.14.0 --save --save-exact --save-dev
```



# Convert to Typescript TS
Install the typescript for react.  
```shell
#npx create-react-app my-app --template typescript

npm i -S typescript @types/node @types/react @types/react-dom @types/jest
#npm i -S @types/crypto-js
#npm i -S @types/randomstring
npm i -S --legacy-peer-deps @types/crypto-js
npm i -S --legacy-peer-deps @types/randomstring
```



# Development
## Notification Panel
**Reference:**  
https://github.com/codedthemes/mantis-free-react-admin-template/blob/main/src/layout/MainLayout/Header/HeaderContent/Notification.js  
https://github.com/codedthemes/mantis-free-react-admin-template/blob/main/src/components/MainCard.js  








# Appendix
## Code change for reference
### EditForm.tsx
#### Original
```typescript
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
} from '@mui/material';

import { DateField, DatePicker } from '@mui/x-date-pickers';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';

import {
  formatDate,
  formatDatetime,
  DATE_FORMAT_DEFAULT,
  DATE_TIME_FORMAT_DEFAULT,
} from '../../../base/utils/date';
import { IItem } from '../../components/Item/Model';
import { getSingleItem } from '../../services/ItemService';
import DialogPrompt from '../../components/ui/DialogPrompt';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ItemForm from '../../components/item/ItemForm';

const formFieldSxDefault = { m: 1, width: '80%' };

const EditItem = (props: any) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { itemId } = params;
  console.debug('EditItem - itemId: ', itemId);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorObj, setErrorObj] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [itemObj, setItemObj] = useState<null | IItem>({null)});

  const nameInputRef = useRef<HTMLInputElement>();
  const purchasedDateInputRef = useRef();
  const [nameVal, setNameVal] = useState<string>('');
  // const [purchasedDateVal, setPurchasedDateVal] = useState<null | string>();
  // const [purchasedDateVal, setPurchasedDateVal] = useState<Date>(new Date());

  useEffect(() => {
    setIsLoading(true);
    // axiosService
    //   .get('http://localhost:4000/user/fav-movies')
    //   .then((response) => {
    //     setMovies(response.data);
    //   });

    // useEffect async
    // Reference:
    // https://devtrium.com/posts/async-functions-useeffect
    console.debug('EditItem - useEffect-1 - itemId: ', itemId);
    if (itemId != null) {
      const fetchData = async () => {
        const data = (await getSingleItem(+itemId)) as IItem;
        // console.debug('EditItem - itemId: [' + itemId + '], data: ', data);
        setItemObj(data);
        console.debug('EditItem - useEffect-1 - setItemObj');
        // can use `!= null`, this includes both null and undefined
        if (data.name !== null && data.name !== undefined) {
          setNameVal(data.name);
        }
        if (data.purchasedDate !== null && data.purchasedDate !== undefined) {
          // setPurchasedDateVal(
          //   data.purchasedDate.toISOString().substring(0, 10)
          // );
          setPurchasedDateVal(data.purchasedDate);
        }
      };
      fetchData().catch((err) => {
        console.error('EditItem - useEffect-1 - err: ', err);
        setIsError(true);
        setErrorObj(err);
      });
    } else {
      const data: IItem = { purchasedDate: new Date() };
      setItemObj(data);
    }
    setIsLoading(false);
  }, []);

  // // const itemObj = props.itemObj == null ? {} : { ...props.itemObj };
  // const itemObj: IItem = itemObj == null ? {} : itemObj;
  // let purchasedDateValueRaw: Date =
  //   itemObj.purchasedDate == null ? new Date() : itemObj.purchasedDate;
  // let purchasedDateValue = purchasedDateValueRaw.toISOString().substring(0, 10);

  const handleFormSubmit = async (
    evt: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    evt.preventDefault();
    setIsDirty(false);
  };

  // const handleFormReset = (evt: React.MouseEvent<HTMLButtonElement>) => {
  //   evt.preventDefault();
  //   evt.currentTarget.form?.reset();
  //   setIsDirty(false);
  // };

  const handleFormFocus = (
    evt: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //navigate(-1);
    //setIsDirty(true);
    console.debug(
      'EditItem - handleFormFocus - evt.target.value: ',
      evt.target.value
    );
    setIsDirty((prevState) => {
      console.debug(
        'EditItem - handleFormFocus - prevState: [' + prevState + ']'
      );
      if (prevState === true) {
        return prevState;
      } else return true;
    });
  };

  const handleTextFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setItemObj({
      ...itemObj,
      [name]: value,
    });
  };

  // https://stackoverflow.com/a/69440640
  const handleDateFieldChange = (name: string, value: any) => {
    setItemObj({
      ...itemObj,
      [name]: value,
    });
  };

  const handleOkDialogPrompt = (evt: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/login`);
  };

  return (
    <>
      <Box>
        <Typography component={'div'}>isLoading: [{isLoading}]</Typography>
        <Typography component={'div'}>isError: [{isError}]</Typography>
        <Typography component={'div'}>errorObj: [{errorObj}]</Typography>
        <Typography component={'div'}>dataObj: [{itemObj?.id}]</Typography>
      </Box>
      {isLoading && <LoadingSpinner />}
      {isError && (
        <DialogPrompt
          open={isError}
          title={t('error.login.expired')}
          message={t('error.login.expired')}
          onOk={handleOkDialogPrompt}
        />
      )}
      {!isLoading && !isError && (
        <ItemForm
          itemObj={itemObj}
          handleFormSubmit={handleFormSubmit}
          // handleTextFieldChange={handleTextFieldChange}
          // handleDateFieldChange={handleDateFieldChange}
        ></ItemForm>
      )}
    </>
  );
};

export default EditItem;
```

#### Now
```typescript
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
import DialogPrompt from '../../components/ui/DialogPrompt';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ItemForm from '../../components/item/ItemForm';

const formFieldSxDefault = { m: 1, width: '80%' };

const EditItem = (props: any) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { itemId } = params;
  console.debug('EditItem - itemId: ', itemId);

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
    console.debug('EditItem - handleFormSubmit - itemRec: ', itemRec);
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
  //   console.debug(
  //     'EditItem - handleFormFocus - evt.target.value: ',
  //     evt.target.value
  //   );
  //   setIsDirty((prevState) => {
  //     console.debug(
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
          title={t('item.update.success')}
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
``` 

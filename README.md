
# npm
## Libraries Installation


**First download from Git**
If there is a `package-lock.json`, `npm ci` should be used,
otherwise use `npm install` or `npm i`.  
**Reference:**  
https://israynotarray.com/nodejs/20211027/1827968017/  

```shell
# use npm ci if package-lock.json exists.
# use npm i if there is no package-lock.json
# npm i
npm ci
```


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
**Reference:**  
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



# xxxxx ESLint (Not working)
Installation of ESLint
```shell
#####eslint@^8.0.1
npm i -D eslint@^8.57.0
npm i -D globals@v13.24.0
npm i -D eslint-config-standard-with-typescript@37.0.0

#####eslint-plugin-promise
#####eslint-plugin-import
#####eslint-plugin-n

#####eslint-plugin-promise@^6.0.0
#####eslint-plugin-import@^2.25.2
#####eslint-plugin-n@^15.0.0 || ^16.0.0

#####typescript@*

#####@typescript-eslint/eslint-plugin@^6.4.0
npm i -D @typescript-eslint/eslint-plugin@5.62.0

npm i -D eslint-plugin-react@^7.34.1
npm i -D @eslint/eslintrc@^2.1.4
npm i -D @eslint/js@^8.57.0
```



# Development
## Notification Panel
**Reference:**  
https://github.com/codedthemes/mantis-free-react-admin-template/blob/main/src/layout/MainLayout/Header/HeaderContent/Notification.js  
https://github.com/codedthemes/mantis-free-react-admin-template/blob/main/src/components/MainCard.js  



# Redux implementation
## Installation
```shell
npm i -S @reduxjs/toolkit react-redux redux
```



# Docker
## Dockerize
**Reference:**  
https://medium.com/@alinaseri/dockerize-react-applications-with-nginx-17f752deb54  


### .dockerignore
build should be kept because docker engine could not recognize if ignored.  
```
node_modules
#build
npm-debug.log
```


### Dockerfile
```dockerfile
# Use Nginx as the production server
FROM nginx:1.25.2

# Set the working directory in the container
# skip setting working directory
#WORKDIR /app

# Copy the conf.d to Nginx's web server conf.d
COPY conf.d /etc/nginx/conf.d

# Copy the built React app to Nginx's web server directory
COPY build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
```


# Runtime Configuration with runtime-config.js
## Build Once, Deploy Many
By default, Create React App and similar setups bundle environment variables at build time, which means variables like process.env.REACT_APP_* are replaced during the build and cannot be changed after the build completes.  
This makes it hard to follow the build once, deploy many principle where the same build artifact should work across environments (e.g., development, staging, production) without rebuilding.

To solve this, you can use a runtime configuration file such as runtime-config.js that is mounted or injected at runtime (for example via a ConfigMap in Kubernetes or Docker volume). The file should be placed in the public/ folder so it is served with the app and loaded before your React code executes (e.g., by adding a `<script src="/runtime-config.js"></script>` to `public/index`.html).  
```javascript
<script src="/runtime-config.js"></script>
```

Inside this file, set any configuration values you need on a global object (e.g., `window.__RUNTIME_CONFIG__ = { API_URL: "..." }`). 
```javascript
window.__RUNTIME_CONFIG__ = { 
  API_URL: "..."
}
```

Your application can then read these values at runtime instead of relying on build-time env vars.

This approach lets you produce a single build artifact that reads its configuration at runtime, satisfying continuous delivery requirements and greatly improving deployment flexibility without rebuilds per environment.


## Target Architecture
```text
React build (static files)
        ↓
Nginx container
        ↓
runtime-config.js mounted at runtime
```
No rebuild per environment


## Development
### react app supports runtime-config.js
public/index.html
```html
<script src="/runtime-config.js"></script>
```

public/runtime-config.js (default fallback)
```javascript
window.__RUNTIME_CONFIG__ = {};
```
### Dockerfile (Build Once)

Example:
```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Important:**  
The `runtime-config.js` inside the image is just a default empty file.


## Deployment
### docker-compose.yml (Mount runtime config)
This is the key part.
```yaml
version: "3.8"

services:
  frontend:
    image: my-react-app:latest
    ports:
      - "3000:80"
    volumes:
      - ./runtime-config.dev.js:/usr/share/nginx/html/runtime-config.js:ro
```

Now:  
- Same image
- Different mounted file
- Different environment behavior
- No rebuild


### Example runtime-config files
runtime-config.dev.js
```javascript
window.__RUNTIME_CONFIG__ = {
  API_BASE_URL: "http://localhost:8080",
  ENV: "development"
};
```

runtime-config.prod.js
```javascript
window.__RUNTIME_CONFIG__ = {
  API_BASE_URL: "https://api.prod.com",
  ENV: "production"
};
```

Then just change the mounted file:
```yaml
volumes:
  - ./runtime-config.prod.js:/usr/share/nginx/html/runtime-config.js:ro
```


### Even Cleaner: Use Environment Variables to Generate It
If you want docker-compose to inject env variables:
```yaml
services:
  frontend:
    image: my-react-app:latest
    ports:
      - "3000:80"
    environment:
      API_BASE_URL: http://localhost:8080
    volumes:
      - ./generate-config.sh:/docker-entrypoint.d/99-runtime-config.sh
```

Then create a script:
```shell
#!/bin/sh

cat <<EOF > /usr/share/nginx/html/runtime-config.js
window.__RUNTIME_CONFIG__ = {
  API_BASE_URL: "${API_BASE_URL}"
};
EOF
```

Nginx runs scripts in /docker-entrypoint.d/ automatically.
Now:  
✔ Single image  
✔ Config injected at container start  
✔ No mounted file needed  

Very production-friendly.  

### Which Approach Should You Choose?
Method	When to use
Volume mount file	Simple local dev
Entry-point script generation	CI/CD / production
ConfigMap (K8s)	Kubernetes


### Why This Satisfies “Build Once, Deploy Many”
Because:
- npm run build happens once
- The built JS never changes
- Only runtime-config.js changes per environment
- Same Docker image across all environments
Architect will be happy  
  

## Kubernetes k8s
### ConfigMap (runtime-config.js)
Create a ConfigMap that contains your runtime config file.
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: frontend-runtime-config
data:
  runtime-config.js: |
    window.__RUNTIME_CONFIG__ = {
      API_BASE_URL: "https://api.dev.mycompany.com",
      ENV: "dev"
    };
```
For staging/prod, just change values — same image, different ConfigMap.


### Deployment.yaml
Mount the ConfigMap as a file into nginx static folder.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: react-frontend
  template:
    metadata:
      labels:
        app: react-frontend
    spec:
      containers:
        - name: react-frontend
          image: my-registry/react-frontend:1.0.0
          ports:
            - containerPort: 80
          volumeMounts:
            - name: runtime-config-volume
              mountPath: /usr/share/nginx/html/runtime-config.js
              subPath: runtime-config.js
              readOnly: true
      volumes:
        - name: runtime-config-volume
          configMap:
            name: frontend-runtime-config
```
Important: Why subPath?  
Without subPath, Kubernetes would replace the whole folder.  
With subPath, it mounts only:  
```arduino
runtime-config.js
```
and keeps the rest of the static build intact.


### Service.yaml (Optional)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: react-frontend-service
spec:
  type: ClusterIP
  selector:
    app: react-frontend
  ports:
    - port: 80
      targetPort: 80
```
If using Ingress, route to this service.


### Why This Is Architect-Approved
You now have:  
Layer	Built Once?	Changes Per Env?  
React Build	✅	❌  
Docker Image	✅	❌  
ConfigMap	❌	✅  
This is the textbook implementation of:  
Build Once → Deploy Many  


### Pro Tip (Production)
If you update the ConfigMap:
Kubernetes does NOT automatically reload pods when using subPath.
You must:
```nginx
kubectl rollout restart deployment react-frontend
```
Or version your ConfigMap name:
```arduino
frontend-runtime-config-v2
```
Then update Deployment to trigger rollout.


### Alternative (Even Cleaner – Env → Generated File)
Instead of writing JS inside `ConfigMap`, you can:  
Pass env vars via `ConfigMap`  
Use entrypoint script to generate `runtime-config.js`  
That gives better separation of config vs JS.  
If you want that version, I can show you the production-grade pattern as well.  






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
import { Item } from '../../components/Item/Model';
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
  // console.debug('EditItem - itemId: ', itemId);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorObj, setErrorObj] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [itemObj, setItemObj] = useState<null | Item>({null)});

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
    // console.debug('EditItem - useEffect-1 - itemId: ', itemId);
    if (itemId != null) {
      const fetchData = async () => {
        const data = (await getSingleItem(+itemId)) as Item;
        // console.debug('EditItem - itemId: [' + itemId + '], data: ', data);
        setItemObj(data);
        // console.debug('EditItem - useEffect-1 - setItemObj');
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
      const data: Item = { purchasedDate: new Date() };
      setItemObj(data);
    }
    setIsLoading(false);
  }, []);

  // // const itemObj = props.itemObj == null ? {} : { ...props.itemObj };
  // const itemObj: Item = itemObj == null ? {} : itemObj;
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
    // console.debug(
    //   'EditItem - handleFormFocus - evt.target.value: ',
    //   evt.target.value
    // );
    setIsDirty((prevState) => {
      // console.debug(
      //   'EditItem - handleFormFocus - prevState: [' + prevState + ']'
      // );
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
import { Item } from '../../components/Item/Model';
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
  // console.debug('EditItem - itemId: ', itemId);

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
  const handleFormSubmit = (itemRec: Item) => {
    // setShowConfirmDialog(true);
    // itemRec.versionNo = 1;
    // itemRec.versionNo = loadedObj.versionNo;  // temporary added here, should prepare in Form
    // console.debug('EditItem - handleFormSubmit - itemRec: ', itemRec);
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

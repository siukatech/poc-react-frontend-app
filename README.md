# POC React Frontend App
This is a poc to test react as frontend application.  


# Packages installed
React is 18.2  
React router is 6.11.2  
Others please refer to following snippet.  

```json
    ...
    "@tasoskakour/react-use-oauth2": "^1.2.0",
    "buffer": "^6.0.3",
    "crypto-js": "^4.1.1",
    "date-fns": "^2.30.0",
    "date-fns-tz": "^2.0.0",
    "env-cmd": "^10.1.0",
    "i18next": "^22.5.1",
    "i18next-http-backend": "^2.2.1",
    "jsencrypt": "^3.3.2",
    "randomstring": "^1.3.0",
    "react-i18next": "^12.3.1",
    "react-pro-sidebar": "^1.1.0-alpha.1",
    ...
```


# Environment profiles setup
In package.json, the 'script' block has been modified.  
The additional package 'env-cmd' is required to install for different profiles setup.

```json
  ...
  "scripts": {
    "bak---start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start": "npm run start:dev",
    "start:dev": "env-cmd -f .env.dev react-scripts start",
    "start:sit": "env-cmd -f .env.sit react-scripts start",
    "build:dev": "env-cmd -f .env.dev react-scripts build",
    "build:sit": "env-cmd -f .env.sit react-scripts build"
  },
  ...
```



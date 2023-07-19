
# npm
## Libraries Installation

```shell
npm i -s react-router-dom
npm i -s jwt-decode
npm i -s axios
npm i -s env-cmd
npm i -s date-fns date-fns-tz
npm i -s crypto-js jsencrypt randomstring
npm i -s i18next i18next-http-backend react-i18next
```



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



# Keycloak Setup
## Scope
The scope `openid` is required after keycloak 20+.  
**Reference:**  
https://keycloak.discourse.group/t/issue-on-userinfo-endpoint-at-keycloak-20/18461/4  

Setup steps:  
1. Go to Client scopes of the selected Realm  
2. Click `Create client scope` button to create new scope `openid` if there is no such scope  
    - name: openid
    - description: Scope for userinfo endpoint  
3. Go to target client and select `Client scopes`  
4. Click `Add client scope` and choose `openid` with `Default` assigned-type
5. Relogin to accquire the new access_token  
6. Should be ok to call /userinfo with new access_token  







const authorize = (clientName) => {

  // const OAUTH_DOMAIN_PREFIX = process.env.REACT_APP_OAUTH_DOMAIN_PREFIX;
  // const OAUTH_AUTHORIZE_URI = OAUTH_DOMAIN_PREFIX + process.env.REACT_APP_OAUTH_AUTHORIZE_URI;
  // // const codeChallenge = '';
  // // const authorize = `http://localhost:38180/oauth2/authorize?response_type=code&grant_type=authorization_code&client_id=client&scope=open&redirect_uri=http://localhost:28080/authorized&code_challenge=${codeChallenge}&method=SHA-256`;
  // // const authorize = `http://localhost:38180/realms/react-backend-realm/protocol/openid-connect/auth?response_type=code&client_id=react-backend-client-01&scope=openid&redirect_uri=http://localhost:3000/authorized`;
  // const authorize = OAUTH_AUTHORIZE_URI;
  let authorize = process.env.REACT_APP_API_DOMAIN_PREFIX
  + process.env.REACT_APP_API_V1_PUBLIC_URI
  + process.env.REACT_APP_OAUTH_AUTHORIZE_URI
  authorize = authorize.replace('{0}', clientName);

  // console.log('authorize - OAUTH_DOMAIN_PREFIX: [' + OAUTH_DOMAIN_PREFIX 
  // + '], process.env.REACT_APP_OAUTH_AUTHORIZE_URI: [' + process.env.REACT_APP_OAUTH_AUTHORIZE_URI 
  // + '], OAUTH_AUTHORIZE_URI: [' + OAUTH_AUTHORIZE_URI 
  // + ']');

  console.log('authorize - authorize: [' + authorize + ']')

  return authorize;

}

export default authorize;


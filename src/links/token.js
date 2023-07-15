const token = (clientName, code) => {
  const codeVerifier = '';
  // return `http://localhost:38180/oauth2/token?client_id=client&redirect_uri=http://localhost:28080/authorized&grant_type=authorization_code&code_verifier=${codeVerifier}&method=SHA-256`;
  // const OAUTH_DOMAIN_PREFIX = process.env.REACT_APP_OAUTH_DOMAIN_PREFIX;
  // const OAUTH_TOKEN_URI = OAUTH_DOMAIN_PREFIX + process.env.REACT_APP_OAUTH_TOKEN_URI;
  // const token = OAUTH_TOKEN_URI;

  let token = process.env.REACT_APP_API_DOMAIN_PREFIX
  + process.env.REACT_APP_API_V1_PUBLIC_URI
  + process.env.REACT_APP_OAUTH_TOKEN_URI
  token = token.replace('{0}', clientName).replace('{1}', code);

  // console.log('token - OAUTH_DOMAIN_PREFIX: [' + OAUTH_DOMAIN_PREFIX 
  // + '], process.env.REACT_APP_OAUTH_TOKEN_URI: [' + process.env.REACT_APP_OAUTH_TOKEN_URI 
  // + '], OAUTH_TOKEN_URI: [' + OAUTH_TOKEN_URI 
  // + ']');

  console.log('token - clientName: [' + clientName + '], code: [' + code + '], token: [' + token + ']')

  return token;
}

export default token;


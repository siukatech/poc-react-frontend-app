import React from "react";

//import { OAuthPopup, useOAuth2 } from '@tasoskakour/react-use-oauth2';


const MainContent = (props) => {
  // const { data, loading, error, getAuth, logout } = useOAuth2({
  //   authorizeUrl: "http://localhost:38180",
  //   clientId: "react-backend-client",
  //   redirectUri: `${document.location.origin}/callback`,
  //   scope: "acr,profile,roles,email",
  //   responseType: "code",
  //   exchangeCodeForTokenServerURL: "http://your-backend/token",
  //   exchangeCodeForTokenMethod: "POST",
  //   onSuccess: (payload) => console.log("Success", payload),
  //   onError: (error_) => console.log("Error", error_)
  // });
  return <><main>{props.children}</main></>;
}

export default MainContent;


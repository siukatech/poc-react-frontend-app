// hooks/useLoginService.ts
import { useContext } from "react";
import { AppConfigContext } from '../contexts/AppConfigContext';

function useLoginService() {
  const appConfig = useContext(AppConfigContext);
  if (!appConfig) {
    throw new Error("AppConfigProvider missing");
  }
  return appConfig.loginService;
}

export {
  useLoginService
}

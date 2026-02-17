// context/AppConfigProvider.tsx
import React, { ReactNode, useMemo } from "react";
import { AppConfigContext } from "./AppConfigContext";
import { AppConfig } from "../models";

interface Props {
  appConfig: AppConfig;
  children: ReactNode;
}

const AppConfigProvider: React.FC<Props> = ({
  appConfig,
  children,
}) => {
  const memoizedAppConfig = useMemo(() => appConfig, [appConfig]);

  return (
    <AppConfigContext.Provider value={memoizedAppConfig}>
      {children}
    </AppConfigContext.Provider>
  );
};

export {
  AppConfigProvider
}

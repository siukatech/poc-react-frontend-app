// context/FrameworkServicesProvider.tsx
import React, { ReactNode, useMemo } from "react";
import { FrameworkServicesContext } from "./FrameworkServicesContext";
import { FrameworkServices } from "../services/FrameworkServices";

interface Props {
  services: FrameworkServices;
  children: ReactNode;
}

const FrameworkServicesProvider: React.FC<Props> = ({
  services,
  children,
}) => {
  const memoizedServices = useMemo(() => services, [services]);

  return (
    <FrameworkServicesContext.Provider value={memoizedServices}>
      {children}
    </FrameworkServicesContext.Provider>
  );
};

export {
  FrameworkServicesProvider
}

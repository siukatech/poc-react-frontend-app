// hooks/useLoginService.ts
import { useContext } from "react";
import { FrameworkServicesContext } from '../../core/contexts/FrameworkServicesContext';

function useLoginService() {
  const services = useContext(FrameworkServicesContext);
  if (!services) {
    throw new Error("FrameworkServicesProvider missing");
  }
  return services.loginService;
}

export {
  useLoginService
}

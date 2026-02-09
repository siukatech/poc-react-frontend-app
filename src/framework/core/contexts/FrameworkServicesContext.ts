// context/ServicesContext.ts
import { createContext } from "react";
import { FrameworkServices } from "../services/FrameworkServices";

const FrameworkServicesContext = createContext<
  FrameworkServices | undefined
>(undefined);

export {
  FrameworkServicesContext
}

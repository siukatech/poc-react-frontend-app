// context/FrameServicesContext.ts
import { createContext } from "react";
import { AppConfig } from "../models";

const AppConfigContext = createContext<AppConfig | undefined>(undefined);

export {
  AppConfigContext
}

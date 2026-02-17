// types/AppConfig.ts
// import { UserService } from "../services/UserService";
// import { AuthService } from "../services/AuthService";
// import { ConfigService } from "../services/ConfigService";
import { RouteObject } from 'react-router-dom';
import { LoginService } from '../../auth';
import { LayoutConfig, MenuItem } from '../../layout/models';

interface RouteConfig {
  childenRoutes: RouteObject[];
}

interface AppConfig {
  // userService: UserService;
  // authService: AuthService;
  // configService: ConfigService;
  loginService: LoginService;
  layoutConfig: LayoutConfig;
  routeConfig: RouteConfig;
}

export type {
  RouteConfig,
  AppConfig,
}
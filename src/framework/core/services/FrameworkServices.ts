// types/FrameworkServices.ts
// import { UserService } from "../services/UserService";
// import { AuthService } from "../services/AuthService";
// import { ConfigService } from "../services/ConfigService";
import { LoginService } from '../../auth';

export interface FrameworkServices {
  // userService: UserService;
  // authService: AuthService;
  // configService: ConfigService;
  loginService: LoginService;
}

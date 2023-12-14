interface IUser {
  loginId: string;
  permissions?: any;
}

interface IUserPermission {
  appMid: string;
  resourceMid: string;
  accessRight: string;
}

export type { IUser, IUserPermission };



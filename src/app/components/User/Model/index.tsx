interface IUser {
  loginId: string;
  permissions?: any;
}

interface IPermission {
  resourceName: string;
  accessRight: string;
}

export type { IUser, IPermission };



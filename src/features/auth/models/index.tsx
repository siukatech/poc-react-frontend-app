interface IUser {
  userId: string;
  permissions?: any;
}

interface IUserPermission {
  applicationId: string;
  appResourceId: string;
  accessRight: string;
}

export type { IUser, IUserPermission };



export interface DataListOption {
  key: string;
  value: string;
}

export interface AuthModel {
  isAuthenticated: boolean,
  token?: string | null
}

export interface UserModel {
  userID: number;
  email: string;
  userName: string;
  password: string;
  roleID: number;
  token: string;
}

export interface TaskModel {
  moduleID: string;
  taskName: string;
  taskType: string;
  numRedmine: string | null;
  assignee: string;
  dateCreate: Date;
  estimatedHour: number;
  dateDelivery: Date;
  note: string;
}
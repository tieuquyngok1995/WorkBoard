export interface DataListOption {
  key: number;
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
  taskType: number;
  numRedmine: string | null;
  assignee: string;
  priority: number;
  dateCreate: Date;
  estimatedHour: number;
  dateDelivery: Date;
  note: string;
}
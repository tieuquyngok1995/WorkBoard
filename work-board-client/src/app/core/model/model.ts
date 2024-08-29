export interface DataListOption {
  key: string;
  value: string;
}

export interface AuthModel {
  isAuthenticated: boolean,
  userName?: string | null
}

export interface UserModel {
  userID: number;
  email: string;
  userName: string;
  password: string;
  roleID: number;
}

export interface TaskModel {
  moduleID: string;
  taskName: string;
  taskType: string;
  numRedmine: number;
  assignee: string;
  dateCreate: Date;
  estimatedHour: number;
  dateDelivery: Date;
  note: string;
}
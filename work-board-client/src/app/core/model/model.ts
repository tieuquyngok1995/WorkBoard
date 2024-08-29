export interface DataListOption {
  key: string;
  value: string;
}

export interface UserModel {
  email: string;
  userID: string;
  password: string;
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
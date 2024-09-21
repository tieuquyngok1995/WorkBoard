import { ProgramMode } from "../enum/enums";

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
  taskName: string | null;
  taskType: number | null;
  listTaskType: DataListOption[] | null;
  numRedmine: string | null;
  assignee: string | null;
  listAssignee: DataListOption[] | null;
  priority: number | null;
  listPriority: DataListOption[] | null;
  dateCreate: Date | null;
  workHour: number;
  estimatedHour: number | null;
  progress: number;
  dateDelivery: Date | null;
  note: string | null;
}

export interface TaskDialog {
  mode?: ProgramMode;
  isDelete?: boolean;
  data?: TaskModel;
}
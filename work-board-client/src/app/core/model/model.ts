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
  dataTaskType: DataListOption[] | null;
  numRedmine: string | null;
  assignee: string | null;
  dataAssignee: DataListOption[] | null;
  priority: number | null;
  dataPriority: DataListOption[] | null;
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

class CreateTaskModel implements TaskModel {
  moduleID = '';
  taskName = null;
  taskType = null;
  dataTaskType = null;
  numRedmine = null;
  assignee = null;
  dataAssignee = null;
  priority = null;
  dataPriority = null;
  dateCreate = null;
  workHour = 0;
  estimatedHour = null;
  progress = 0;
  dateDelivery = null;
  note = null;
}
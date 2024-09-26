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

export interface HomeModel {
  taskDialog: TaskModel;
  listTasks: TaskModel[];
}

export interface TaskStatusModel {
  Waiting: TaskModel[];
  InProgress: TaskModel[];
  Pending: TaskModel[];
  Completed: TaskModel[];
}

export interface TaskModel {
  moduleID: string;
  taskName: string | null;
  type: number;
  typeName: string | null;
  dataTaskType: DataListOption[] | null;
  numRedmine: string | null;
  assignee: number;
  assigneeName: string | null;
  dataAssignee: DataListOption[] | null;
  priority: number;
  dataPriority: DataListOption[] | null;
  dateCreate: Date | null;
  workHour: number;
  estimatedHour: number;
  progress: number;
  dateDelivery: Date | null;
  note: string | null;
  taskStatus: number;
  dataTaskStatus: DataListOption[] | null;
}

export interface TaskDialog {
  mode?: ProgramMode;
  isDelete?: boolean;
  data?: TaskModel;
}

// class CreateTaskModel implements TaskModel {
//   moduleID = '';
//   taskName = null;
//   taskType = null;
//   dataTaskType = null;
//   numRedmine = null;
//   assignee = null;
//   dataAssignee = null;
//   priority = null;
//   dataPriority = null;
//   dateCreate = null;
//   workHour = 0;
//   estimatedHour = null;
//   progress = 0;
//   dateDelivery = null;
//   note = null;
// }
import { ProgramMode } from "../enum/enums";

export interface DataListOption {
  key: number;
  value: string;
}

export interface TemplateSendMailModel {
  templateID: number | null;
  templateName: string;
  subject: string;
  content: string;
  toUser: string;
}

export interface TemplateSendMailListModel {
  dataTemplate: DataListOption[] | null;
  dataToUser: DataListOption[] | null;
  templates: TemplateSendMailModel[];
}

export interface UserModel {
  userID: number;
  email: string;
  userName: string;
  password: string;
  roleID: number;
  roleName: string;
  token: string;
}

export interface UserListModel {
  dataRole: DataListOption[] | null;
  users: UserModel[];
}

export interface AuthModel {
  isAuthenticated: boolean,
  token?: string | null
}

export interface HeaderModel {
  searchMode?: number;
  searchValue?: string | null;
  searchDateStart?: Date | null;
  searchDateEnd?: Date | null;
  message?: string | null;
}

export interface ToastModel {
  isShow: boolean;
  message: string;
}

export interface HomeModel {
  taskDialog: TaskModel;
  listTasks: TaskModel[];
}

export interface TaskStatusModel {
  waiting: TaskModel[];
  progress: TaskModel[];
  pending: TaskModel[];
  completed: TaskModel[];
}

export interface TaskModel {
  id: number;
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
  estimatedHour: number;
  dateDelivery: Date | null;
  note: string | null;
  dateWork: Date | null;
  dateWorkStart: Date | null;
  workHour: number;
  progress: number;
  taskStatus: number;
  dataTaskStatus: DataListOption[] | null;
}

export interface TaskDialog {
  mode?: ProgramMode;
  isDelete?: boolean;
  data?: TaskModel;
}

export interface SendMailDialog {

}

export interface UserDialog {
  data: UserModel;
  dataRole: DataListOption[] | null;
  dataName: string[]
}
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
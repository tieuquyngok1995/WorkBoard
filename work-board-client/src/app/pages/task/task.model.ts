export interface TaskModel {
  moduleID: string;
  taskName: string;
  taskType: string;
  assignee: string;
  dateCreate: Date;
  estimatedHour: number;
  dateDelivery: Date
}
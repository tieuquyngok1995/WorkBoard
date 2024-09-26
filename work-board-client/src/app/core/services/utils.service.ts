import { Injectable } from '@angular/core';
import { DataListOption, TaskModel, TaskStatusModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getListTask(listStatus: DataListOption[], listTask: TaskModel[]) {
    return listTask.reduce((acc, task) => {
      // Get name status
      const statusName = listStatus.find(status => status.key === task.taskStatus)?.value;

      // Skip task name
      if (!statusName) {
        return acc;
      }

      // Check and create arr
      if (statusName && acc[statusName as keyof TaskStatusModel]) {
        // Thêm task vào mảng tương ứng với statusName nếu tồn tại
        acc[statusName as keyof TaskStatusModel].push(task);
      }

      return acc;
    }, {
      Waiting: [],
      InProgress: [],
      Pending: [],
      Completed: []
    } as TaskStatusModel);
  }

  public objCompare(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    for (const key of keys1) {
      if (!keys2.includes(key)) {
        continue;
      }

      if (!this.objCompare(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }
}
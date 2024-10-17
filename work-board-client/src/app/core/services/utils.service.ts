import { Injectable } from '@angular/core';
import { DataListOption, TaskModel, TaskStatusModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public static isNullOrEmpty(str: string | null | undefined): boolean {
    return !str || str.trim() === '';
  }

  public static isDateInRange(currentDate: Date | null, startDate: Date | null | undefined, endDate: Date | null | undefined): boolean {
    if (!currentDate || !startDate || !endDate) return false;
    return new Date(currentDate) >= startDate && new Date(currentDate) <= endDate;
  }

  public static getListTask(listStatus: DataListOption[], listTask: TaskModel[]) {
    return listTask.reduce((acc, task) => {
      // Get name status
      const statusName = listStatus.find(status => status.key === task.taskStatus)?.value;

      // Skip task name
      if (!statusName) {
        return acc;
      }

      // Check and create arr
      if (statusName && acc[statusName as keyof TaskStatusModel]) {
        acc[statusName as keyof TaskStatusModel].push(task);
        acc[statusName as keyof TaskStatusModel].sort((a, b) => a.priority - b.priority);
      }

      return acc;
    }, {
      waiting: [],
      progress: [],
      pending: [],
      completed: []
    } as TaskStatusModel);
  }

  public static objCompare(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
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
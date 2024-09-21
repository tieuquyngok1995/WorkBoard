import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataListOption } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Get value in data list
   * @param value 
   * @param data 
   * @returns 
   */
  public getKeyDataList(value: string, data: DataListOption[]) {
    return data.find(item => item.value === value)?.key ?? 0;
  }

  /**
   * Get key in data list
   * @param key 
   * @param data 
   * @returns 
   */
  public getValueDataList(key: number, data: DataListOption[]) {
    return data.find(item => item.key === key)?.value ?? null;
  }

}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Subject listten change data
  private dataSource$ = new BehaviorSubject<HeaderModel | null>(null);
  public currentData = this.dataSource$.asObservable();

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor() { }

  /**
   * Send data 
   * @param data 
   */
  public sendData(data: HeaderModel | null) {
    this.dataSource$.next(data);
  }
}
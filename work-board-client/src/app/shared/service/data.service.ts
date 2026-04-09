import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource$ = new BehaviorSubject<HeaderModel | null>(null);
  public currentData = this.dataSource$.asObservable();

  public sendData(data: HeaderModel | null) {
    this.dataSource$.next(data);
  }
}
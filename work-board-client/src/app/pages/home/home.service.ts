import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";

import { HomeModel, TaskModel } from "../../core/model/model";
import { CommonApiService } from "../../core/services/common-api.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private commonApiService: CommonApiService) { }

  public getInit(): Observable<HomeModel | null> {
    return this.commonApiService.get<HomeModel>(this.commonApiService.urlGetIndex).pipe(
      map((data) => data),
      catchError((error) => of(error))
    );
  }

  public createTask(body: TaskModel): Observable<boolean> {
    return this.commonApiService.post(this.commonApiService.urlCreateTask, body).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public updateTask(body?: TaskModel): Observable<boolean> {
    return this.commonApiService.post(this.commonApiService.urlUpdateTask, body).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
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

  public updateTaskStatus(moduleID: string, taskStatus: number): Observable<boolean> {
    return this.commonApiService.get(this.commonApiService.urlUpdateTaskStatus, { moduleID, taskStatus }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public updateTaskProgress(moduleID: string, workHour: number, progress: number, note: string): Observable<boolean> {
    return this.commonApiService.get(this.commonApiService.urlUpdateTaskProgress, { moduleID, workHour, progress, note }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public delete(moduleID: string): Observable<boolean> {
    return this.commonApiService.get(this.commonApiService.urlDeleteTask, { moduleID }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
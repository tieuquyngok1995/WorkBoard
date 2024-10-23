import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";

import { HomeModel, TaskModel } from "../../core/model/model";
import { CommonApiService } from "../../core/services/common-api.service";
import { WebsocketService } from "../../core/services/web-socket.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private readonly commonApiService: CommonApiService, private readonly websocketService: WebsocketService) {
    this.websocketService.connect(commonApiService.urlUpdateTaskStatus, commonApiService.wsTask);
  }

  public getInit(): Observable<HomeModel | null> {
    return this.commonApiService.get<HomeModel>(this.commonApiService.urlGetIndex).pipe(
      map((data) => data),
      catchError((error) => of(error))
    );
  }

  public createTask(body: TaskModel): Observable<TaskModel | null> {
    return this.commonApiService.post<TaskModel>(this.commonApiService.urlCreateTask, body).pipe(
      map((result) => result),
      catchError(() => of(null))
    );
  }

  public updateTask(body?: TaskModel): Observable<boolean> {
    return this.commonApiService.post(this.commonApiService.urlUpdateTask, body).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public updateTaskStatus(TaskStatus: number, ID: number, ModuleID: string, WorkHour: number, Progress: number, DateWork: Date | null): void {
    const body = JSON.stringify({ ID, ModuleID, TaskStatus, WorkHour, Progress, DateWork });
    this.websocketService.sendData(this.commonApiService.wsTask, body);
  }

  public updateTaskProgress(ID: number, moduleID: string, workHour: number, progress: number, note: string): Observable<boolean> {
    return this.commonApiService.get(this.commonApiService.urlUpdateTaskProgress, { ID, moduleID, workHour, progress, note }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public delete(ID: number, moduleID: string): Observable<boolean> {
    return this.commonApiService.get(this.commonApiService.urlDeleteTask, { ID, moduleID }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { TaskModel } from "src/app/core/model/model";
import { CommonApiService } from "src/app/core/services/common-api.service";

@Injectable({
  providedIn: 'root'
})
export class TaskCalendarService {

  /**
   * A constructor initializes a class's objects upon creation.
   * @param commonApiService 
   * @param websocketService 
   */
  constructor(private readonly commonApiService: CommonApiService) {
  }

  /**
   * Get all task
   * @returns 
   */
  public getAllTask(): Observable<TaskModel[]> {
    return this.commonApiService.get<TaskModel[]>(this.commonApiService.urlGetCalendar).pipe(
      catchError(() => of([]))
    );
  }
}

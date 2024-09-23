import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { TaskModel } from "../../core/model/model";
import { CommonApiService } from "../../core/services/common-api.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private commonApiService: CommonApiService) { }

  public createTask(body: TaskModel): Observable<boolean> {
    return this.commonApiService.post<boolean>(this.commonApiService.urlCreateTask, body).pipe(
      map(data => {
        return data;
      })
    );
  }
}
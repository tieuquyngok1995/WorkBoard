
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, Subject } from "rxjs";

import { UserListModel, UserModel } from "../../../core/model/model";
import { CommonApiService } from "../../../core/services/common-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * A constructor initializes a class's objects upon creation.
   * @param commonApiService 
   * @param websocketService 
   */
  constructor(private readonly commonApiService: CommonApiService) { }

  /**
   * Get data init.
   */
  public getInit(): Observable<UserListModel | null> {
    return this.commonApiService.get<UserListModel>(this.commonApiService.urlSettingUsers).pipe(
      catchError(() => of(null))
    );
  }

  /**
   * Update user
   * @param body 
   * @returns 
   */
  public updateUser(body?: UserModel): Observable<boolean> {
    return this.commonApiService.post(this.commonApiService.urlSettingUpdateUsers, body).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
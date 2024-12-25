import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { catchError, map, Observable, of, Subject } from "rxjs";

import { HeaderModel, UserModel } from "../../core/model/model";
import { WebsocketService } from "../../core/services/web-socket.service";
import { CommonApiService } from "../../core/services/common-api.service";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private form!: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param fb Form Builder
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly commonApiService: CommonApiService,
    private readonly websocketService: WebsocketService) {
  }

  // Get form
  get datePickerForm(): FormGroup { return this.form = this.createFormGroup(); }
  // Get value
  get dateStart() { return this.form.get('dateStart') }
  get dateEnd() { return this.form.get('dateEnd') }

  /**
   * Initialize FormGroup
   * @param taskProgress 
   * @returns FormGroup
   */
  private createFormGroup(taskProgress?: HeaderModel): FormGroup {
    const today = new Date();
    return this.fb.group({
      dateStart: [taskProgress?.searchDateEnd || new Date(today.getFullYear(), today.getMonth() - 1, 26)],
      dateEnd: [taskProgress?.searchDateEnd || new Date(today.getFullYear(), today.getMonth(), 25)]
    });
  }

  /**
   * Get noti send in socket
   * @returns 
   */
  public getNotification(): Subject<any> {
    return this.websocketService.getData(this.commonApiService.wsConnect);
  }

  /**
   * Connect web socket
   * @param userID 
   */
  public connectWebSocket(userID: number): void {
    this.websocketService.connect(this.commonApiService.urlConnectWebSocket + "?userId=" + userID, this.commonApiService.wsConnect);
  }

  /**
   * Get noti send in socket
   * @returns 
   */
  public getUSer(): Observable<UserModel | null> {
    return this.commonApiService.get<UserModel>(this.commonApiService.urlSettingUsers).pipe(
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

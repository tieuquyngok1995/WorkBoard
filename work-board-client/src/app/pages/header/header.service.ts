import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HeaderModel } from "../../core/model/model";
import { WebsocketService } from "src/app/core/services/web-socket.service";
import { CommonApiService } from "src/app/core/services/common-api.service";
import { Subject } from "rxjs";

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
}

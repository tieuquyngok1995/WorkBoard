import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/shared/service/message.service';
import { DialogMessageService } from 'src/app/shared/service/dialog-message.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient,
    private messageService: MessageService,
    private confirmDialogService: DialogMessageService) { }

  downloadExcel(): void {
    this.http.get(this.apiUrl + 'Home/DownloadFile', { responseType: 'blob', observe: 'response' }).subscribe(response => {
      const now = new Date();
      let fileName = `${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}_WBS.xlsx`;

      // Check response.body 
      const blob = response.body;
      if (blob) {
        // Create URL blob
        const url = window.URL.createObjectURL(blob);

        // Create anchor tag for download
        const anchor: HTMLAnchorElement = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName;

        // Trigger the download
        const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
        anchor.dispatchEvent(clickEvent);

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E015'));
      }
    }, (error) => {
      this.confirmDialogService.openDialog(this.messageService.getMessage('E009') + error.message);
    });
  }
}
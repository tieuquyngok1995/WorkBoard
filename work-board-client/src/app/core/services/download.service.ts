import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {

  constructor(@Inject('API_URL') private apiUrl: string, private http: HttpClient) { }

  downloadExcel(): void {
    this.http.get(this.apiUrl + 'Home/DownloadFile', { responseType: 'blob' }).subscribe((blob) => {
      // Tạo URL từ blob
      const url = window.URL.createObjectURL(blob);

      // Tạo tên file với ngày tháng
      const fileName = `file.xlsx`; // Tên file sẽ là "data_YYYY-MM-DD.xlsx"

      // Tạo thẻ <a> tạm thời để tải file
      const anchor: HTMLAnchorElement = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;

      // Kích hoạt sự kiện click
      const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
      anchor.dispatchEvent(clickEvent);

      // Giải phóng URL
      window.URL.revokeObjectURL(url); // Giải phóng URL
    });
  }
}
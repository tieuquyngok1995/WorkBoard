import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private socket: WebSocket | null = null;
  private dataSubject = new Subject<string>();

  private reconnectInterval = 5000;
  private isManuallyClosed = false;
  private isReadyToSend = false;

  private urlUpdateTaskStatus = 'Task/UpdateTaskStatus';

  constructor(@Inject('API_URL') private apiUrl: string) {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.apiUrl + this.urlUpdateTaskStatus);

    this.socket.onmessage = (event) => {
      this.dataSubject.next(event.data);
    };

    this.socket.onopen = () => {
      this.isReadyToSend = true;
    };

    this.socket.onclose = () => {
      this.isReadyToSend = false;
      if (!this.isManuallyClosed) {
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    };
  }

  public sendData(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN && this.isReadyToSend) {
      this.socket.send(message);
    }
  }

  public closeConnection() {
    this.isManuallyClosed = true;
    if (this.socket) {
      this.socket.close();
    }
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
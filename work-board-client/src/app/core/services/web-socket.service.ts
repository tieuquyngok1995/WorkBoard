import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private sockets: { [key: string]: WebSocket } = {};
  private dataSubjects: { [key: string]: Subject<any> } = {};

  constructor(@Inject('API_URL') private apiUrl: string) { }

  public connect(url: string, apiName: string): void {
    if (this.sockets[apiName]) {
      return;
    }

    this.sockets[apiName] = new WebSocket(this.apiUrl + url);
    this.dataSubjects[apiName] = new Subject<any>();

    this.sockets[apiName].onmessage = (event) => {
      this.dataSubjects[apiName].next(event.data);
    };
  }

  public sendData(apiName: string, message: string): void {
    const socket = this.sockets[apiName];
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }

  public getData(apiName: string): Subject<any> {
    return this.dataSubjects[apiName];
  }

  public closeConnection(apiName: string): void {
    if (this.sockets[apiName]) {
      this.sockets[apiName].close();
      delete this.sockets[apiName];
    }
  }

  public ngOnDestroy(): void {
    Object.keys(this.sockets).forEach((apiName) => this.closeConnection(apiName));
  }
}
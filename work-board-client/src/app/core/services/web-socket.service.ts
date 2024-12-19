import { Subject } from 'rxjs';
import { Inject, Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private sockets: { [key: string]: WebSocket } = {};
  private dataSubjects: { [key: string]: Subject<any> } = {};

  /**
   * A constructor initializes a class's objects upon creation.
   * @param apiUrl 
   */
  constructor(@Inject('API_URL') private readonly apiUrl: string) { }

  /**
   * Create connection socket.
   * @param url 
   * @param apiName 
   * @returns 
   */
  public connect(url: string, apiName: string): void {
    if (this.sockets[apiName]) {
      return;
    }

    this.sockets[apiName] = new WebSocket(this.apiUrl.replace("https", "wss") + url);
    this.dataSubjects[apiName] = new Subject<any>();

    this.sockets[apiName].onmessage = (event) => {
      this.dataSubjects[apiName].next(event.data);
    };
  }

  /**
   * Process sending data to server.
   * @param apiName 
   * @param message 
   */
  public sendData(apiName: string, message: string): void {
    const socket = this.sockets[apiName];
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }

  /**
   * Handle receiving data from server
   * @param apiName 
   * @returns 
   */
  public getData(apiName: string): Subject<any> {
    return this.dataSubjects[apiName];
  }

  /**
   * Close connection.
   * @param apiName 
   */
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
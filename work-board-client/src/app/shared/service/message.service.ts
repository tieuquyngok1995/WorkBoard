import { Injectable } from '@angular/core';
import { MESSAGES } from '../../core/constants/messages.constants';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getMessage(key: keyof typeof MESSAGES): string {
    return MESSAGES[key];
  }
}
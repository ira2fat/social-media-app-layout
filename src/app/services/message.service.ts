import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Message {
    sender: string;
    recipient: string;
    content: string;
  }

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    private messages: Message[] = [];

  sendMessage(sender: string, recipient: string, content: string): Observable<void> {
    this.messages.push({ sender, recipient, content });
    return of();
  }

  getMessages(recipient: string): Observable<any[]> {
    return of(this.messages.filter(msg => msg.recipient === recipient));
  }
}
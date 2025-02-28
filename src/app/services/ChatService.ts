import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket$ = webSocket('ws://localhost:8080/ws/chat');
  messagesSubject = new Subject<string>();

  constructor() {
    this.socket$.subscribe(
      (message) => this.messagesSubject.next(message as string),
      (error) => console.error('WebSocket error:', error),
      () => console.warn('WebSocket closed!')
    );
  }

  sendMessage(message: string): void {
    console.log('*** message: ', message);
    this.socket$.next(message);
  }

  getMessages(): Observable<string> {
    return this.messagesSubject.asObservable();
  }
}

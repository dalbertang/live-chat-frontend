import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from '../chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket$ = webSocket<ChatMessage>('ws://localhost:8080/ws/chat');
  messagesSubject = new Subject<ChatMessage>();

  constructor() {
    this.socket$.subscribe(
      (message:ChatMessage) => this.messagesSubject.next(message),
      (error) => console.error('WebSocket error:', error),
      () => console.warn('WebSocket closed!')
    );
  }

  // sendMessage(message: string): void {
  sendMessage(content: string, parentId?: string): void {
    const message: ChatMessage = {
      sender: 'User', // Replace with actual user data later
      content,
      timestamp: new Date().toISOString(),
      parentId
    };
    console.log('*** sending: ', message);;

    this.socket$.next(message);
  }

  getMessages(): Observable<ChatMessage> {
    return this.messagesSubject.asObservable();
  }
}

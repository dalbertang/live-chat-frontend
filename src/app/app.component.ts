import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/ChatService';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'live-chat-frontend';

  messages: string[] = [];
  messageInput = '';

  constructor(private chatService: ChatService) {
    this.chatService.getMessages()
    .pipe(
        tap(msg => console.log('Received message: ', msg))
    )
    .subscribe(msg => this.messages.push(msg));
  }

  sendMessage() {
    if (this.messageInput.trim()) {
      console.log('*** this.messageInput: ', this.messageInput);
      this.chatService.sendMessage(this.messageInput);
      this.messageInput = '';
    }
  }
}

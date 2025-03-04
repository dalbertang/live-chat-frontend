import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/chat.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { tap } from 'rxjs';
import { ChatMessage } from './chat-message.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'live-chat-frontend';

  messages: ChatMessage[] = [];
  messageInput = '';
  replyingTo?: string; // Tracks which message is being replied to

  constructor(private chatService: ChatService) {
    this.chatService.getMessages()
    .pipe(
        tap(msg => console.log('Received message: ', msg))
    )
    .subscribe((msg: ChatMessage) => {
      return this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.messageInput.trim()) {
      console.log('*** this.messageInput: ', this.messageInput);
      this.chatService.sendMessage(this.messageInput, this.replyingTo);
      this.messageInput = '';
      this.replyingTo = undefined;
    }
  }

  replyToMessage(messageId: string | undefined) {
    console.log('*** Replying to message: ', messageId);
    this.replyingTo = messageId;
  }

  getReplies(parentId: string | undefined): ChatMessage[] {
    return this.messages.filter(msg => msg.parentId === parentId);
  }
}

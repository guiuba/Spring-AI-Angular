import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ChatService } from '../chat-service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-simple-chat',
  imports: [MatCardModule, MatToolbarModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, NgClass],
  templateUrl: './simple-chat.html',
  styleUrl: './simple-chat.scss'
})
export class SimpleChat {
  @ViewChild('chatHistory')
  private chatHistory!: ElementRef;

  private chatService = inject(ChatService);


  userInput = '';

  isLoading = false;

  isLocal = false;

  messages = signal([
    {text: 'Hello, how can I help you today?', isBot: true}

  ]);

  sendMessage(): void {
  this.trimUserInput();
  if (this.userInput !== '' && !this.isLoading) {
    this.updateMessages(this.userInput);
    this.isLoading = true;

    if(this.isLocal) {
      this.simulateResponse();
    } else {
      this.sendChatMessage();
    }
  }
}

private sendChatMessage(): void {
  this.chatService.sendChatMessage(this.userInput)
  .pipe(
    catchError(()  => {
      this.updateMessages('Sorry, something went wrong. Please try again later.', true);
      this.isLoading = false;
      return throwError(() => new Error('Chat service error'));
    })
  )
  .subscribe((response: { message: string; }) => {
      this.updateMessages(response.message, true);
      this.userInput = '';
      this.isLoading = false;
    });
}

private updateMessages(text: string, isBot = false): void {
  this.messages.update(messages => [...messages, {text, isBot}]);
  this.scrollToBottom();
}



private trimUserInput(): void {
    this.userInput = this.userInput.trim();
  }

  private simulateResponse(): void {
    setTimeout(() => {
      const response = 'This is a simulated response from the Chat AI';
      this.updateMessages(response, true);

      this.userInput = '';
      this.isLoading = false;
    }, 2000);

  }

  private scrollToBottom(): void {

    try {
     //  setTimeout(() => {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
   // }, 0);
    } catch (error) {

    }

  }

}

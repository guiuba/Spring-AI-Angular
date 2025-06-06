import { inject, Injectable } from '@angular/core';
import { ChatResponse } from './chat-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private readonly API = '/api/chat';

  private http = inject(HttpClient);

  sendChatMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.API, { message });
  }
}

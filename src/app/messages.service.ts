import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private messages: any = [];
  private messagesUpdated = new Subject<Message[]>();
  private host: string = 'https://speakeasy-backend.herokuapp.com/';

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{ message: string; data: any }>(this.host + 'messages')
      .pipe(
        map((result) => {
          return result.data.map((message: any) => {
            return {
              author: message.author,
              content: message.content,
              id: message._id,
              timestamp: message.createdAt,
            };
          });
        })
      )
      .subscribe((messages) => {
        this.messages = messages;
        this.messagesUpdated.next([...this.messages]);
      });
  }

  getMessageUpdateListener() {
    return this.messagesUpdated.asObservable();
  }

  addMessage(author: string, content: string) {
    const message: Message = {
      author: author || 'Anonymous',
      content: content,
      id: '',
      timestamp: '',
    };

    this.http
      .post<{ message: string; messageId: string; createdAt: string }>(
        this.host + 'messages',
        message
      )
      .subscribe((responseData) => {
        const timestamp = responseData.createdAt;
        const id = responseData.messageId;
        message.id = id;
        message.timestamp = timestamp;
        this.messages.push(message);
        this.messagesUpdated.next([...this.messages]);
      });
  }
}

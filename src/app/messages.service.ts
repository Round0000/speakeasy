import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private messages: Message[] = [];
  private messagesUpdated = new Subject<Message[]>();

  getMessages() {
    this.messages = [
      {
        author: 'Ezio',
        content: 'Est-ce un test svp?',
        timestamp: '14:15',
        id: '1',
      },
      {
        author: 'Ezio',
        content: 'ALLO !! 😴',
        timestamp: '14:24',
        id: '2',
      },
      {
        author: 'Jean-Bob',
        content: "Bonsoir, ceci n'est pas un test.",
        timestamp: '14:29',
        id: '3',
      },
      {
        author: 'Ezio',
        content: 'Io mangio la mela...! 🥴',
        timestamp: '14:33',
        id: '4',
      },
    ];

    return this.messages;
  }

  getMessageUpdateListener() {
    return this.messagesUpdated.asObservable();
  }

  getFormattedDate(date: Date, format: string) {
    console.log(date);
    const YYYY = date.getFullYear().toString();
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const DD = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');
    format = format.replace('YYYY', YYYY);
    format = format.replace('MM', MM);
    format = format.replace('DD', DD);
    format = format.replace('hh', hh);
    format = format.replace('mm', mm);
    format = format.replace('ss', ss);
    return format;
  }

  addMessage(author: string, content: string) {
    const message: Message = {
      id: '',
      author: author || 'Anonymous',
      content: content,
      timestamp: this.getFormattedDate(new Date(), 'hh:mm'),
    };
    console.log(message);
    this.messages.push(message);
  }
}

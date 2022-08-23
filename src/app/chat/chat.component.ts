import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  currentAuthor = 'Jean-Bob';

  messages: Message[] = [];
  private messagesSub: Subscription = new Subscription();

  constructor(public messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messages = this.messagesService.getMessages();
    this.messagesSub = this.messagesService
      .getMessageUpdateListener()
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }

  onAddMessage(form: NgForm) {
    if (form.invalid) return;

    this.messagesService.addMessage(form.value.author, form.value.content);
    form.resetForm();
  }
}

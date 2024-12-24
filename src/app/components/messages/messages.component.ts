import { Component } from '@angular/core';
import { Message, MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messages: Message[] = [];
  newMessage: string = '';
  recipient: string = 'user2'; // Example recipient
  sender: string = 'user1'; // Example sender

  constructor(private messageService: MessageService) {}

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messageService.sendMessage(this.sender, this.recipient, this.newMessage).subscribe(() => {
        this.loadMessages();
        this.newMessage = ''; // Clear input after sending
      });
    }
  }

  loadMessages() {
    this.messageService.getMessages(this.recipient).subscribe((msgs) => {
      this.messages = msgs;
    });
  }

  ngOnInit() {
    this.loadMessages();
  }
}
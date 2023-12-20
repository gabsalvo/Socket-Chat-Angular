import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  @Input() room: string = '';
  @Input() username: string | null = null;
  message: string = '';
  messages: string[] = [];
  inRoom: boolean = false;
  @Output() leave = new EventEmitter<void>();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((data: any) => {
      if (data.room === this.room) {
        this.messages.push(data.message);
      }
    });
  }

  joinRoom(): void {
    this.chatService.joinRoom(this.room);
    this.inRoom = true;
  }
  leaveRoom(): void {
    console.log(`Leaving room: ${this.room}`);
    this.chatService.leaveRoom(this.room);
    this.inRoom = false;
    this.leave.emit();
  }

  sendMessage(): void {
    this.chatService.sendMessageToRoom(this.room, this.message);
    this.message = '';
  }
  generateRoomCode(): void {
    this.room = Math.random().toString(36).substring(2, 9);
  }
}

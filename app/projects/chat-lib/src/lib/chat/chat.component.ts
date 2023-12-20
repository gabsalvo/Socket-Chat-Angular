import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  activeRooms: string[] = [];
  roomCode = '';
  inRoom = false;

  constructor(private chatService: ChatService) {}

  createRoom(): void {
    this.roomCode = this.chatService.generateRoomCode();
    console.log(this.roomCode);
    this.joinRoom();
  }

  joinRoom(): void {
    this.chatService.joinRoom(this.roomCode);
    this.inRoom = true;
  }
  leaveRoom(): void {
    this.chatService.leaveRoom(this.roomCode);
    this.roomCode = '';
    this.inRoom = false;
  }
  ngOnInit() {
    this.chatService.getActiveRoomsUpdates().subscribe((rooms) => {
      this.activeRooms = rooms;
    });
    this.fetchActiveRooms();
  }

  fetchActiveRooms(): void {
    this.chatService.getActiveRooms().subscribe((rooms) => {
      this.activeRooms = rooms;
    });
  }
}

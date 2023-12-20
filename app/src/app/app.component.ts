import { Component, OnInit } from '@angular/core';
import { ChatService } from 'chat-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeRooms: string[] = [];
  roomCode = '';
  inRoom = false;
  username = 'gab';

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
    this.chatService.getActiveRoomsUpdates().subscribe((rooms: string[]) => {
      this.activeRooms = rooms;
    });
    this.fetchActiveRooms();
  }

  fetchActiveRooms(): void {
    this.chatService.getActiveRooms().subscribe((rooms: string[]) => {
      this.activeRooms = rooms;
    });
  }
}

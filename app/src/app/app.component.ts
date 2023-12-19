import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service'; // Aggiusta il percorso in base alla struttura del tuo progetto

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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

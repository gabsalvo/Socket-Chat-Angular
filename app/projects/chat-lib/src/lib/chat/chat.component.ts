import { Component, OnInit, Input } from '@angular/core';
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
  globalRoomId = 'Global Chat';
  @Input() username: string | null = 'default';
  globalMessages: { username: string; message: string }[] = [];

  constructor(private chatService: ChatService) {}

  joinGlobalChat(): void {
    this.roomCode = this.globalRoomId;
    this.joinRoom();
    this.fetchGlobalMessages();
  }

  fetchGlobalMessages(): void {
    if (this.roomCode === this.globalRoomId) {
      this.chatService.getGlobalMessages().subscribe((messages) => {
        this.globalMessages = messages; // Salva i messaggi nella proprietà
      });
    }
  }

  joinNamedRoom(): void {
    if (this.roomCode.trim()) {
      this.joinRoom();
    }
  }

  createRoom(): void {
    this.roomCode = this.chatService.generateRoomCode();
    console.log(this.roomCode);
    this.joinRoom();
  }

  joinRoom(): void {
    if (this.username != null) {
      this.chatService.joinRoom(this.roomCode, this.username);
      this.inRoom = true;
    }
  }

  leaveNamedRoom(): void {
    if (this.username != null) {
      this.chatService.leaveRoom(this.roomCode, this.username);
      this.roomCode = '';
      this.inRoom = false;
    }
  }
  ngOnInit() {
    console.log('Username in ChatComponent:', this.username);
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

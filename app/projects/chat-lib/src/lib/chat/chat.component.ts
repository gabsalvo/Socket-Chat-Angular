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
  globalRoomId = 'global_chat';
  @Input() username: string | null = null;

  constructor(private chatService: ChatService) {}

  joinGlobalChat(): void {
    this.roomCode = this.globalRoomId;
    this.joinRoom();
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
    this.chatService.joinRoom(this.roomCode, this.username);
    this.inRoom = true;
  }
  leaveNamedRoom(): void {
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

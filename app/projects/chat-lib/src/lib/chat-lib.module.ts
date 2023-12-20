import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [ChatComponent, ChatRoomComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [ChatComponent, ChatRoomComponent],
  providers: [ChatService],
})
export class ChatLibModule {}

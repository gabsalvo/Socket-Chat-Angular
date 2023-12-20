import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatService } from './services/chat.service';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [ChatComponent, ChatRoomComponent, WrapperComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [ChatComponent, ChatRoomComponent, WrapperComponent],
  providers: [ChatService],
})
export class ChatLibModule {}

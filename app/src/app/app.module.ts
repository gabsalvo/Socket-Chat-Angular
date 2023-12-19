import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './services/chat.service';
import { ChatRoomComponent } from './chat-room/chat-room.component';

@NgModule({
  declarations: [AppComponent, ChatComponent, ChatRoomComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}

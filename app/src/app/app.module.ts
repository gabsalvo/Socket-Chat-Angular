import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatLibModule } from '../../projects/chat-lib/src/lib/chat-lib.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [AppComponent, WrapperComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChatLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

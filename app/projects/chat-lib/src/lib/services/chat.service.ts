import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private baseUrl = 'https://0e9b-93-35-217-254.ngrok-free.app';

  constructor(private http: HttpClient) {
    const room = localStorage.getItem('chatRoom');
    this.socket = io('https://0e9b-93-35-217-254.ngrok-free.app');
  }

  public getGlobalMessages(): Observable<any[]> {
    const headers = new HttpHeaders({ 'ngrok-skip-browser-warning': 'true' });
    return this.http.get<any[]>(
      'https://0e9b-93-35-217-254.ngrok-free.app/global-messages',
      { headers: headers },
    );
  }

  public sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  public getMessages(): Observable<{ username: string; message: string }> {
    return new Observable((observer) => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  public joinRoom(room: string, username?: string): void {
    this.socket.emit('joinRoom', { room, username: username || 'default' });
  }

  public leaveRoom(room: string, username?: string): void {
    this.socket.emit('leaveRoom', { room, username: username || 'default' });
  }

  public sendMessageToRoom(
    room: string,
    message: string,
    username: string,
  ): void {
    this.socket.emit('sendMessage', { room, message, username });
  }
  public generateRoomCode(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  public getActiveRooms(): Observable<string[]> {
    const headers = new HttpHeaders({ 'ngrok-skip-browser-warning': 'true' });
    return this.http.get<string[]>(
      'https://0e9b-93-35-217-254.ngrok-free.app/active-rooms',
      { headers: headers },
    );
  }

  public getActiveRoomsUpdates(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('activeRooms', (rooms) => {
        observer.next(rooms);
      });
    });
  }
}

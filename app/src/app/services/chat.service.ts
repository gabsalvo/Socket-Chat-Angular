import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    const room = localStorage.getItem('chatRoom');
    this.socket = io('http://localhost:3000');
  }

  public sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  public getMessages(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }

  public joinRoom(room: string): void {
    this.socket.emit('joinRoom', { room });
  }

  public leaveRoom(room: string): void {
    this.socket.emit('leaveRoom', { room });
  }

  public sendMessageToRoom(room: string, message: string): void {
    this.socket.emit('sendMessage', { room, message });
  }
  public generateRoomCode(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  public getActiveRooms(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/active-rooms');
  }

  public getActiveRoomsUpdates(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('activeRooms', (rooms) => {
        observer.next(rooms);
      });
    });
  }
}

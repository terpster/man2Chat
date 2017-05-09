import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Message } from '../components/chat/message';
import * as io from 'socket.io-client';
import {Chatroom} from '../components/chat/chatroom';

@Injectable()
export class ChatService {
  private url = window.location.origin;
  private socket = io(this.url);

  constructor(
    private http: Http
  ) { }

  sendMessage(message){
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/chat/send-message', message, {headers: headers})
      .map(res => res.json());
  }

  getMessages(room): Observable<Message[]>{
    const observable = new Observable(observer => {
      this.socket.emit('send current room', room);
      this.socket.on('refresh messages', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getOnlineUsers(): Observable<String[]>{
    const observable = new Observable(observer => {
      this.socket.emit('request online users');
      this.socket.on('get online users', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  createRoom(room){
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/chat/create-chatroom', room, {headers: headers})
      .map(res => res.json());
  }

  connectToChat(username){
    this.socket.emit('connect to chat', username);
  }

  getChatrooms(): Observable<Chatroom[]>{
    const chatroomsList = new Observable(observer => {
      this.socket.on('refresh chatrooms', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return chatroomsList;
  }

  changeRoom(newRoom){
    this.socket.emit('change room', newRoom);
  }

}

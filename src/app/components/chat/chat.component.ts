import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Chatroom } from './chatroom';
import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: String = JSON.parse(localStorage.getItem('user')).name;
  name: String;
  message: String;
  room: String;
  currentRoom = '';
  public chatMessages = [];
  public chatrooms = [];
  public onlineUsers = [];
  title = 'Please enter a room';

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private router: Router
  ) { }

  ngOnInit() {
    // Set the current room
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['currentRoom']) {
        this.currentRoom = params['currentRoom'];
        this.title = this.currentRoom;
        console.log('current room is: ', this.currentRoom);
      }
    });
    this.connectToChat();
    this.getChatrooms();
    this.getMessages(this.currentRoom);
    this.getOnlineUsers();
  }

  connectToChat() {
    console.log('Connecting user to chat');
    this.chatService.connectToChat(this.username);
  }

  getOnlineUsers() {
    this.chatService.getOnlineUsers()
      .subscribe(
        onlineUsers => {
          this.onlineUsers = onlineUsers;
        }
      );
  }

  sendMsg() {
    const message: Message = {
      name: this.username,
      message: this.message,
      chatroom: this.currentRoom
    };
    this.chatService.sendMessage(message).subscribe();
  }

  getMessages(room) {
    this.chatService.getMessages(room)
      .subscribe(
        messages => {
          this.chatMessages = messages;
        }
      );
  }

  // Chatrooms
  createRoom() {
    const newChatroom: Chatroom = {
      name: this.room,
      owner: JSON.parse(localStorage.getItem('user')).name
    };
    this.chatService.createRoom(newChatroom).subscribe();
  }

  getChatrooms() {
    this.chatService.getChatrooms()
      .subscribe(
        chatrooms => {
          this.chatrooms = chatrooms;
        }
      );
  }

  changeRoom(chatroom) {
    this.currentRoom = chatroom;
    this.chatService.changeRoom(this.currentRoom);
    this.getChatrooms();
    this.getMessages(this.currentRoom);
    this.getOnlineUsers();
    this.title = this.currentRoom;
  }

  clientIsInRoom() {
    if (this.currentRoom) {
      return true;
    }
  }

}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {

  private socket = io('http://localhost:4040');

  // Emit User in Match Queue
  requestMatch(data: any) {
    this.socket.emit('userJoinQueue', data);
  }

  // Emit User leaving queue
  leaveMatch() {
    this.socket.emit('userLeaveQueue');
  }

  // Listener for Match Spawn requeust with Room credentials
  matchSpawned() {
    const observable = new Observable<{ roomId: string }>(observer => {
      this.socket.on('matchSpawned', (data: any) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });

    return observable;
  }

  // Join Room with ID receieved in Match Spawn
  joinRoom(data: any) {
    this.socket.emit('joinRoom', data);
  }

  // Listener for Match Initialization with set of questions
  initMatch() {
    const observable = new Observable<{ roomId: string }>(observer => {
      this.socket.on('matchStarted', (data: any) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });

    return observable;
  }

  sendResponse(data: any) {
    this.socket.emit('recordResponse', data);
  }

  // Listener for queueing next question
  nextQuestion() {
    const observable = new Observable<{ roomId: string }>(observer => {
      this.socket.on('queueNextQuestion', (data: any) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });

    return observable;
  }

}

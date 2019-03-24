import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {

  private socket = io('http://localhost:4040');

  requestMatch(data) {
    this.socket.emit('userJoinQueue', data);
  }

  leaveMatch() {
    this.socket.emit('userLeaveQueue');
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { SocketService } from '../socket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [SocketService]
})
export class ProfileComponent implements OnInit, OnDestroy {

  // Properties
  userId: string;
  playerNumber: number;
  matchId: string;

  constructor(
    private navCtrl: NgxNavigationWithDataComponent,
    private socket: SocketService,
    private cookie: CookieService
  ) {

    // Subscribe for matchSpawned listener
    this.socket.matchSpawned()
      .subscribe(data => this.onMatchSpawned(data));
    this.socket.initMatch()
      .subscribe(data => this.onMatchInit(data));
  }

  ngOnInit() {
    // Check for User ID in Cookie, navigate back to login otherwise
    if (this.cookie.check('userId')) {
      this.userId = this.cookie.get('userId');
    } else {
      this.navCtrl.navigate('login');
    }
  }

  ngOnDestroy() {
    // Leave queue on Destroy
    this.socket.leaveMatch();
  }

  /**
   * On Click Start button
   */
  startMatch() {
    // This adds the Socket and User ID to match queue
    this.socket.requestMatch({ userId: this.userId });
  }

  // Listener on  Match spawned request when an opponent is found
  onMatchSpawned(data: any) {
    this.playerNumber = data.player;
    this.matchId = data.roomId;
    // Pass the data as it is, server is expecting same format
    this.socket.joinRoom(data);
  }

  // Listener on Match Initialization request, expect set of questions
  onMatchInit(data: any) {
    this.navCtrl.navigate('match', {
      matchId: this.matchId,
      questions: data,
      playerNumber: this.playerNumber
    });
  }

  logout() {
    this.cookie.delete('userId');
    this.navCtrl.navigate('');
  }

}

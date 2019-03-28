import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [SocketService]
})
export class ProfileComponent implements OnInit, OnDestroy {

  // Properties
  userId: string;

  constructor(
    private navCtrl: NgxNavigationWithDataComponent,
    private socket: SocketService) {

    // Subscribe for matchSpawned listener
    this.socket.matchSpawned()
      .subscribe(data => this.onMatchSpawned(data));
    this.socket.initMatch()
      .subscribe(data => this.onMatchInit(data));
  }

  ngOnInit() {
    const response = this.navCtrl.get('response');
    this.userId = response.data.user_id;
  }

  ngOnDestroy() {
    this.socket.leaveMatch();
  }

  startMatch() {
    this.socket.requestMatch({ userId: this.userId });
  }

  onMatchSpawned(data) {
    // Pass the data as it is, server is expecting same format
    this.socket.joinRoom(data);
  }

  onMatchInit(data) {
    console.log(data);
  }

}

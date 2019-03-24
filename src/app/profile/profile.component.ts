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

  userId: string;

  constructor(
    private navCtrl: NgxNavigationWithDataComponent,
    private socket: SocketService) { }

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

}

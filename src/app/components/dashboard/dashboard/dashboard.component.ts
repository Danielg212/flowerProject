import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../../../services/User.model';
import {AngularFireMessaging} from '@angular/fire/messaging';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public state$: Observable<object>;
  public isMenuCollapsed = true;

  // currentMessage = new BehaviorSubject(null);


  constructor(private auth: AuthService,
              private activatedRoute: ActivatedRoute,
              private afMessaging: AngularFireMessaging) {
  }

  public userData: Partial<UserModel> = {};

  ngOnInit(): void {
    console.log('in ngOnInit, pretty nice here...');

    this.auth.user$.subscribe(
      value1 => {
        return this.userData = value1;
      }
    );
    // this.value = this.auth.userData;

  }

  ngOnDestroy(): void {
    localStorage.clear();
    this.auth.signOut();
  }

  onLogout(uid: string) {
    localStorage.clear();
    this.auth.signOut();
  }

  requestPermission() {
    this.afMessaging.usePublicVapidKey('BDF2b_OOMFxIlMJ3XCKTjsnnfhcJscW7pdNq2rz-pJLhysm18vjkeZZGi_FS9XM3kgBG7Ch8ggGipMPDsLTqcmc');
    // requestToken combines requestPermission and tokenChanges
    this.afMessaging.requestToken
      .subscribe(
        async (token) => {
          await this.auth.updateData(token, 'messagingToken').then(value1 => {
            console.log('token saved!');
          });
        },
        (error) => {
          console.error(error);
        },
      );
  }


  /*  requestPushNotificationsPermission() { // requesting permission
      this.generateToken();
      this.afMessaging.messages.subscribe(
        (payload) => {
          console.log('new message received. ', payload);
          this.currentMessage.next(payload);
        });

    }

    generateToken() {
      this.afMessaging.getToken // getting tokens
        .subscribe(
          async (token) => { // USER-REQUESTED-TOKEN
            await this.auth.updateData(token, 'messagingToken');
          },
          (error) => {
            console.error(error);
          }
        );
    }*/
}

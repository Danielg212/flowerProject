import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../../../services/User.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public state$: Observable<object>;
  public isMenuCollapsed = true;

  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute) {
    console.log('helllo from dashboard');

  }

  public value: UserModel = {};

  ngOnInit(): void {
    this.auth.userData$.subscribe(
      value1 => this.value = value1
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
}

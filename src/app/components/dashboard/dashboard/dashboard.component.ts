import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
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
  }

  public value: UserModel = {};

  ngOnInit(): void {
    const item: any = JSON.parse(localStorage.getItem('dataSource'));
    console.log('item', item);
    if ( item == null || Object.keys(item).length === 0 ) {
      this.activatedRoute.paramMap
        .pipe(map(() => window.history.state)).subscribe(
        value1 => {
          this.value = value1; },
      );

      localStorage.setItem('dataSource', JSON.stringify({
        displayName: this.value.displayName,
        email: this.value.email,
        photoURL: this.value.photoURL
      }));
    } else {
      this.value = item;
    }

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

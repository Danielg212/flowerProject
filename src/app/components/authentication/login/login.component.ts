import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {UserModel} from '../../../services/User.model';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: UserModel = null;
  // tslint:disable-next-line:ban-types
  public signin: boolean;
  faGoogle = faGoogle;

  constructor(public auth: AuthService, private router: Router) {
    // this.auth.users$.subscribe(value => {
    //   this.user = value;
    // });
  }
  ngOnInit(): void {
  }

  navigateToDashboard() {

    this.router.navigateByUrl('/dashboard', {state: this.user});
  }

  logout() {
  }

  onSignin() {

  }

   async login() {
     await this.auth.googleSignIn().then(value => {
       this.navigateToDashboard();
     });
  }
}

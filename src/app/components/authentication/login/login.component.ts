import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {UserModel} from '../../../services/User.model';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: UserModel = null;
  // tslint:disable-next-line:ban-types
  public signin: boolean;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  faGoogle = faGoogle;

  deferredPrompt: any;
  showButton = false;
  submitted: boolean;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder) {
    // this.auth.users$.subscribe(value => {
    //   this.user = value;
    // });
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }


  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  navigateToDashboard() {

    // this.router.navigateByUrl('/dashboard', {state: this.user});
  }

  logout() {
  }

  onSignin() {

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  get isMobile(): boolean {
    return window.innerWidth <= 576;
  }

  async login() {
    await this.auth.googleSignIn(this.isMobile).then(value => {
      this.navigateToDashboard();
    });
  }

  createUser() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const {name, email, password} = this.registerForm.value;
      this.auth.registerUser(name, email, password);
    }
  }

  loginWithEmail() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.auth.loginUser(email, password);

    }
  }

  toggleSignInMethod($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.signin = !this.signin;
  }
}

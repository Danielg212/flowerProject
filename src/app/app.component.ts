import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Observable<any[]>;

  // constructor(private auth: AuthService, private router: Router) {
  //   // this.items = firestore.collection('items').valueChanges();
  //   auth.userData$.subscribe(value => {
  //     if (value != null) {
  //       this.router.navigate(['/dashboard']);
  //     }
  //   });
  // }

  title = 'flower';
}

import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: Observable<any[]>;
  title = 'flower';


  constructor(private titleService: Title, private metaService: Meta, private swUpdate: SwUpdate) {

  }

  // constructor(private auth: AuthService, private router: Router) {
  //   // this.items = firestore.collection('items').valueChanges();
  //   auth.userData$.subscribe(value => {
  //     if (value != null) {
  //       this.router.navigate(['/dashboard']);
  //     }
  //   });
  // }

  ngOnInit() {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'חישוב,פרישה,וסת,מחשבון,טהרה,משפחה,סמוך לוסת'},
      {name: 'description', content: 'המקום האישי שלך לטהרת המשפחה'},
      {name: 'robots', content: 'index, follow'}
    ]);


  }

}

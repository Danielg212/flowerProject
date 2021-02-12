import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  items: Observable<any[]>;
  title = 'flower';
  updateAvailable = false;


  constructor(private titleService: Title, private metaService: Meta, private updates: SwUpdate) {
    // this.updateClient();
    // this.updates.checkForUpdate();

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
    this.titleService.setTitle(this.title);
    // not working proparly - adding tags after rendering
    // this.metaService.addTags([
    //   {property: 'og:site_name', content: 'טהרת הבית'},
    //   {property: 'og:url', conten: 'https://media.giphy.com/media/h86PVmFNq6f2l3gMWI/source.gif'},
    //   {property: 'og:title', content: 'Title of GIF page'},
    //   {property: 'og:description', content: 'Some description'},
    //   {property: 'og:type', content: 'video.other'},
    //   {property: 'og:image', content: 'https://media.giphy.com/media/h86PVmFNq6f2l3gMWI/source.gif'},
    //   {property: 'og:image:width', content: '800'},
    //   {property: 'og:image:height', content: '400'},
    //   {name: 'robots', content: 'index,follow'},
    //   {property: 'og:title', content: 'טהרת הבית - חישוב ימי פרישה בקליק'},
    //   {name: 'keywords', content: 'חישוב,פרישה,וסת,מחשבון,טהרה,משפחה,סמוך לוסת'},
    //   {name: 'description', content: 'המקום האישי שלך לטהרת המשפחה'},
    //   {name: 'robots', content: 'index, follow'}
    // ]);


  }

  updateClient() {
    if (!this.updates.isEnabled) {
      console.log('Not Enable');
      return;
    }
    this.updates.available.subscribe((event) => {
      console.log('current', event.current, 'available', event.available);
      if (confirm('New version available. Load New Version?')) {
        this.updates.activateUpdate().then(() => location.reload());
      }
    });

    this.updates.activated.subscribe((event) => {
      console.log('previous', event.previous, 'available', event.current);
    });

  }

  ngAfterViewInit() {
    if (this.updates.isEnabled) {
      this.updates.available
        .subscribe(() => {
          if (confirm('New version available. Load New Version?')) {
            this.updates
              .activateUpdate()
              .then(() => {
                window.location.reload();
              });
          }
        });
    }
  }

}

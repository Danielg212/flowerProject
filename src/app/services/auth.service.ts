import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {first, map, take, tap} from 'rxjs/operators';
import {UserModel} from './User.model';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import * as firebase from 'firebase/app';
import {auth, firestore, User} from 'firebase/app';
import {MonthInterval} from './MonthInterval.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import FieldValue = firestore.FieldValue;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users$: Observable<any>;
  userData$: Observable<User | null>;

  private userStore$: BehaviorSubject<User> = new BehaviorSubject<User| null>(null);
  user$ = this.userStore$.asObservable();


  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone) {
    afAuth.onAuthStateChanged(user => this.onAuthStateChanged(user));

    // this.initUser();


  }

  onAuthStateChanged(user: User): void {
    if (user) {
      this.userStore$.next(user);
      this.isAuthenticatedSubject.next(true);
      console.log('logged In!');
    } else {
      this.userStore$.next(null);
      this.isAuthenticatedSubject.next(false);
      console.log('logged Out!');
    }
  }

  // initUser() {
  //   this.afAuth.authState.pipe(
  //     take(1),
  //     map(user => {
  //       if (user) {
  //         this.userStore$.next(user);
  //         localStorage.setItem('user', JSON.stringify(user));
  //         JSON.parse(localStorage.getItem('user'));
  //         return of(user);
  //       } else {
  //         localStorage.setItem('user', null);
  //         JSON.parse(localStorage.getItem('user'));
  //         return of(null);
  //       }
  //     })
  //   ).subscribe();
  // }


  getUser() {
    return this.userData$.pipe(first());
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        take(1),
        map(user => {
          return !!user;
        }, () => {
          return false;
        }),
        tap(loggedIn => {
            if (!loggedIn) {
              //  console.log('access deniel');
              this.router.navigate(['/']);
            }
          }
        ));
  }

  // Sign in with Google
  async googleSignIn(isMobile) {
    if (isMobile) {
      await this.login(new auth.GoogleAuthProvider());
    } else {
      return await this.AuthLogin(new auth.GoogleAuthProvider());
    }
  }

  // Auth logic to run auth providers
  async AuthLogin(provider) {
    return await this.afAuth.setPersistence('local')
      .then(_ => this.afAuth.signInWithPopup(provider)
        .then((result) => {
          this.userStore$.next(result.user);
          this.router.navigate(['dashboard']);
          // this.updateUserDate(result.user);
        }).catch((error) => {
          console.error(error);
          alert(error);
        }));
  }

  async login(provider) {
    await this.afAuth.signInWithRedirect(provider);
    this.afAuth.getRedirectResult().then(result => {
      if (result.user) {
        this.router.navigate(['dashboard']);
        // this.updateUserDate(result.user);
      }
    }).catch(reason => {
      alert(reason.message);
    });
  }


  private updateUserDate({uid, email, displayName, photoURL}: UserModel) {
    const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${uid}`);
    const data: UserModel = {
      uid,
      email,
      displayName,
      photoURL
    };
    return userRef.set(data, {merge: true});
  }

  async signOut() {
    await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

  async updateData(value: string, key: string) {
    try {
      const newDatasetRef = this.afs
        .collection<any>(`users`)
        .doc(`${this.userStore$.getValue().uid}`);

      await newDatasetRef.update({[key]: value});
    } catch (e) {
      console.error(e);
    }
  }


  // TODO export to diffrent serivice
  // tslint:disable-next-line:jsdoc-format
  /** async **/ addMonthForIntervalsHistory(intervalData: Partial<MonthInterval>, constInterval: NgbDateStruct | undefined) {
    // const user = await this.afAuth.currentUser;
    // this.afs.doc(`IntervalsHistory/${this.user.uid}`).set([].push(intervalData));
    const data = [intervalData];
    const newDatasetRef = this.afs
      .collection<any>(`intervalsHistory`)
      .doc(`${this.userStore$.getValue().uid}`)
      .update({
        data: FieldValue.arrayUnion(...[intervalData]),
        constIntervalDate: Object.assign({}, constInterval)
      });

    return newDatasetRef;

    /*   return this.listOldIntervalsHistory()
         .valueChanges()
         .pipe(
           take(1),
           tap((oldData: any) => {
             data.push(...oldData.intervalsHistory);
             newDatasetRef.set({
               data: FieldValue.arrayUnion(...data)
             }, {merge: true});
           })).toPromise();*/


    // this.listOldIntervalsHistory()
    //   .snapshotChanges()
    //   .subscribe(value => {
    //     data.push(...value.payload.get('intervalsHistory'));
    //     return newDatasetRef.update({
    //       data: FieldValue.arrayUnion(...data)
    //     });
  }

  removeMonthForIntervalsHistory(intervalData: MonthInterval) {
    const washingtonRef = this.afs
      .collection(`intervalsHistory`)
      .doc(`${this.userStore$.getValue().uid}`);
// Atomically remove a region from the "regions" array field.
    washingtonRef.update({
      data: FieldValue.arrayRemove(intervalData)
    });
  }

  getUserIntervalsHistory(): Observable<{ data: Array<MonthInterval> }> {
    const user = JSON.parse(localStorage.getItem('user')) as UserModel;
    return this.afs.collection<Array<MonthInterval>>('intervalsHistory').doc(this.userStore$.getValue().uid).valueChanges().pipe(
      map((value: any) => {
        if (value.data) {
          value.data
            .sort((a, b) => (b.currentSeeDay.year - a.currentSeeDay.year)
              || (b.currentSeeDay.month - a.currentSeeDay.month)
              || (b.currentSeeDay.day - a.currentSeeDay.day));
        }
        return value;
      })
    );
    // this.groceryItemsDoc = this.afs.doc<UserModel>('users/' + user.uid);
    // this.groceryItems = this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').valueChanges();
  }

  listOldIntervalsHistory(): AngularFirestoreDocument<Array<MonthInterval>> {
    return this.afs.collection<Array<MonthInterval>>('users').doc(`${this.userStore$.getValue().uid}`);
  }
}

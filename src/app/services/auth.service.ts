import {Injectable, NgZone} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {UserModel} from './User.model';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import * as firebase from 'firebase/app';
import {auth, firestore} from 'firebase/app';
import {MonthInterval} from './MonthInterval.model';
import FieldValue = firestore.FieldValue;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users$: Observable<any>;
  userData$: Observable<any>;
  private user: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone) {


    this.userData$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          JSON.parse(localStorage.getItem('user'));
          return of(user);
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
          return of(null);
        }
      })
    );

    // this.users$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     console.log('user: ', user);
    //     if (user) {
    //       this.afs.doc<UserModel>(`users/${user.uid}`).valueChanges();
    //       return of(user);
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
  }

  // // Returns true when user is looged in and email is verified
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

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
  async googleSignIn() {
    return await this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider) {
    return await this.afAuth.setPersistence('local')
      .then(_ => this.afAuth.signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          });
          this.updateUserDate(result.user);
        }).catch((error) => {
          window.alert(error);
        }));
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

  // TODO export to diffrent serivice
  // tslint:disable-next-line:jsdoc-format
  /** async **/ addMonthForIntervalsHistory(intervalData: MonthInterval) {
    // const user = await this.afAuth.currentUser;
    // console.log('dsfdsfds', user);
    // this.afs.doc(`IntervalsHistory/${this.user.uid}`).set([].push(intervalData));

    const washingtonRef = this.afs.collection(`users`).doc(`${this.user.uid}`);

// Atomically add a new region to the "regions" array field.
    return washingtonRef.update({
      intervalsHistory: FieldValue.arrayUnion(intervalData)
    });


  }

  removeMonthForIntervalsHistory(intervalData: MonthInterval) {
    const washingtonRef = this.afs.collection(`users`).doc(`${this.user.uid}`);
// Atomically remove a region from the "regions" array field.
    washingtonRef.update({
      intervalsHistory: FieldValue.arrayRemove(intervalData)
    });
  }

  getUserIntervalsHistory() {
    const user = JSON.parse(localStorage.getItem('user')) as UserModel;
    return this.afs.collection(`users`).doc<UserModel>(`${user.uid}`);
  }
}

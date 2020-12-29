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
          this.router.navigate(['dashboard']);
          this.updateUserDate(result.user);
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
        this.updateUserDate(result.user);
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

  // TODO export to diffrent serivice
  // tslint:disable-next-line:jsdoc-format
  /** async **/ addMonthForIntervalsHistory(intervalData: MonthInterval) {
    // const user = await this.afAuth.currentUser;
    // this.afs.doc(`IntervalsHistory/${this.user.uid}`).set([].push(intervalData));
    const data = [intervalData];
    const newDatasetRef = this.afs
      .collection<any>(`intervalsHistory`)
      .doc(`${this.user.uid}`);


    return this.listOldIntervalsHistory()
      .valueChanges()
      .pipe(
        take(1),
        tap((oldData: any) => {
          data.push(...oldData.intervalsHistory);
          newDatasetRef.set({
            data: FieldValue.arrayUnion(...data)
          }, {merge: true});
        })).toPromise();

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
      .doc(`${this.user.uid}`);
// Atomically remove a region from the "regions" array field.
    washingtonRef.update({
      data: FieldValue.arrayRemove(intervalData)
    });
  }

  getUserIntervalsHistory(): AngularFirestoreDocument<any> {
    const user = JSON.parse(localStorage.getItem('user')) as UserModel;
    return this.afs.collection<Array<MonthInterval>>('intervalsHistory').doc(user.uid);
    // this.groceryItemsDoc = this.afs.doc<UserModel>('users/' + user.uid);
    // this.groceryItems = this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').valueChanges();
  }

  getItems(): Observable<any[]> {
    return this.afs.collection('items').valueChanges();
  }

  listOldIntervalsHistory(): AngularFirestoreDocument<Array<MonthInterval>> {
    return this.afs.collection<Array<MonthInterval>>('users').doc(`${this.user.uid}`);
  }

  async updateData(value: string, key: string) {
    try {
      const newDatasetRef = this.afs
        .collection<any>(`users`)
        .doc(`${this.user.uid}`);

      await newDatasetRef.update({[key]: value});
    } catch (e) {
      console.error(e);
    }
  }
}

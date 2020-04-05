import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserModel} from './User.model';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    this.users$ = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log('user: ', user);
        if (user) {
          return this.afs.doc<UserModel>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const cerdential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserDate(cerdential.user);
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
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }
}

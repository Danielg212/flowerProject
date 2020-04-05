import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take, tap} from 'rxjs/operators';
import {loggedIn} from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.users$.pipe(
      take(1),
      map(user =>  {
       return !!user}),
      tap(loggedIn => {
        console.log("loggedIn",loggedIn);
        if (!loggedIn) {
          console.log('access deniel');
          this.router.navigate(['/login']);
        }
      })
    );
  }

}

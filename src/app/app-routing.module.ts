import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import {map} from 'rxjs/operators';
import {IntervalsDiaryComponent} from './components/dashboard/intervals-diary/intervals-diary.component';
import {AbstinenceDaysCalcComponent} from './components/dashboard/abstinence-days-calc/abstinence-days-calc.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToDashboard = () => map(user => user ? ['dashboard'] : true);
const routes: Routes = [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [AngularFireAuthGuard],
      data: {authGuardPipe: redirectLoggedInToDashboard}
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AngularFireAuthGuard],
      data: {authGuardPipe: redirectUnauthorizedToLogin},
      children: [
        {
          path: '', // child route path
          component: AbstinenceDaysCalcComponent // child route component that the router renders
        },
        {
          path: 'diary',
          component: IntervalsDiaryComponent,
        }
      ]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

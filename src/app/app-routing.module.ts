import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './components/authentication/login/login.component';


const routes: Routes = [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
  {
    path: 'login',
    component: LoginComponent,
  },
    {path: 'dashboard', component: DashboardComponent}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'MMORPG Sandbox Project' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'MMORPG Sandbox Project' }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: { title: 'MMORPG Sandbox Project' }
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: { title: 'MMORPG Sandbox Project' }
  },
  {
    path: 'create',
    component: CreateAccountComponent,
    data: { title: 'MMORPG Sandbox Project' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

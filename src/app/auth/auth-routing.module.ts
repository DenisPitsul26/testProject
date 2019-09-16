import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'verify-email', component: VerifyEmailComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

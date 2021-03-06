import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthRoutingModule} from './auth-routing.module';
import {RouterModule} from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from '../shared/components/loader/loader.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, RouterModule, ReactiveFormsModule, FormsModule, SharedModule],
  declarations: [AuthComponent, LoginComponent, RegistrationComponent, ForgotPasswordComponent, VerifyEmailComponent]
})
export class AuthModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SystemComponent } from './system/system.component';
import {AuthComponent} from './auth/auth.component';
import {AuthModule} from './auth/auth.module';
import {SystemModule} from './system/system.module';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth/auth.guard';
import {AccessRoutingStudentGuard} from './shared/services/access-routing-student.guard';
import {AccessRoutingTeacherGuard} from './shared/services/access-routing-teacher.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccessControlWorkGuard} from './shared/services/access-control-work.guard';

const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID'
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AuthModule,
    SystemModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, AccessRoutingStudentGuard, AccessRoutingTeacherGuard, AccessControlWorkGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

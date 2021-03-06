import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoComponent } from './logo/logo.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { MaterialModule } from './material.module';
import { SignUpComponent } from './home/signup/signup.component';
import { AuthService } from './home/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowOnDirtyErrorStateMatcher, ErrorStateMatcher } from '@angular/material';
import { ProfileComponent } from './profile/profile.component';

import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { CookieService } from 'ngx-cookie-service';
import { MatchComponent } from './match/match.component';
import { SocketService } from './socket.service';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    NgxNavigationWithDataComponent,
    CookieService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

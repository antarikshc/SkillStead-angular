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

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent
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
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

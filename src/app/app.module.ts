import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { GoogleChartModule } from './components/google-chart/google-chart.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
export const REDUCER_TOKEN = new InjectionToken('Registered Reducers');
import { appReducers } from './store/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { NgxContentLoadingModule } from 'ngx-content-loading';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './components/base/base.component';
import { LoginComponent } from './components/login/login.component';
import { BasicLayoutComponent } from './common/basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './common/blank-layout/blank-layout.component';
import { FooterComponent } from './common/footer/footer.component';
import { TopnavbarComponent } from './common/topnavbar/topnavbar.component';
import { TeamComponent } from './components/team/team.component';
import { NotesComponent } from './components/notes/notes.component';
import { MutualInterestComponent } from './components/mutual-interest/mutual-interest.component';

// Services
import {AuthService} from './services/auth.service';
import {AppGuardService} from './guards/app-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseComponent,
    LoginComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    FooterComponent,
    TopnavbarComponent,
    TeamComponent,
    NotesComponent,
    MutualInterestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    HttpClientModule,
    GoogleChartModule,
    NgxContentLoadingModule,
  ],
  providers: [
    AuthService,
    AppGuardService,
    {
      provide: REDUCER_TOKEN,
      useValue: appReducers,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

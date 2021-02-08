import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

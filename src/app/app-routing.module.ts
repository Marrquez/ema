import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './components/base/base.component';
import {BlankLayoutComponent} from "./common/blank-layout/blank-layout.component";
import {BasicLayoutComponent} from "./common/basic-layout/basic-layout.component";
import {LoginComponent} from "./components/login/login.component";
import { TeamComponent } from './components/team/team.component';
import { NotesComponent } from './components/notes/notes.component';
import { MutualInterestComponent } from './components/mutual-interest/mutual-interest.component';

const routes: Routes = [
  // Main redirect
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  // App views
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'base', component: BaseComponent},
      {path: 'team', component: TeamComponent},
      {path: 'notes', component: NotesComponent},
      {path: 'mutual-interest', component: MutualInterestComponent},
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  // Handle all other routes
  {path: '**',  redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

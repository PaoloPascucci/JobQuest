import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { SingleQuestComponent } from './components/single-quest/single-quest.component';
import { RequestComponent } from './components/request/request.component';
import { ModificaQuestComponent } from './components/modifica-quest/modifica-quest.component';
import { SingleRequestComponent } from './components/single-request/single-request.component';
import { NewQuestComponent } from './components/new-quest/new-quest.component';

const routes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'quests/:id',
    canActivate: [AuthGuard],
    component: SingleQuestComponent,
  },
  {
    path: 'modifica-quest/:id',
    canActivate: [AuthGuard],
    component: ModificaQuestComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'new-quest', component: NewQuestComponent, canActivate: [AuthGuard] },
  { path: 'single-request/:id', canActivate: [AuthGuard], component: SingleRequestComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SingleQuestComponent,
    RequestComponent,
    ModificaQuestComponent,
    SingleRequestComponent,
    NewQuestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

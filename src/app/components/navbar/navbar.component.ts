import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

utente!:AuthData | null;

  constructor(private authSrv:AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user)=> {
      this.utente = _user;
    })
  }
logout() {
  this.authSrv.logout()
}
}

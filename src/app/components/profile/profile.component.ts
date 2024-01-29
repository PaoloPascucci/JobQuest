import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Quest } from 'src/app/models/quest';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  utente!: any;
  quests: Quest[] = [];

  constructor(private authSrv: AuthService, private questSrv: QuestService, private router:Router) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });
    const uID = this.authSrv.getUserId()
    this.questSrv.getAllQuest(uID!).subscribe((all) => {
      this.quests = all;
      console.log(all);
    });
  }
  checkRequest(){
    this.router.navigate(["/request"])
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { QuestService } from 'src/app/services/quest.service';
import { Quest } from 'src/app/models/quest';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  utente!: any;
  quests: Quest[] = [];
  constructor(private authSrv: AuthService, private questSrv: QuestService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });

    this.questSrv.getQuest().subscribe(
      (all) => {
        this.quests = all;
      },
      (error) => {
        console.error('erroe nella get dei post', error);
      }
    );

    this.authSrv.restore();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Quest } from 'src/app/models/quest';
import { QuestService } from 'src/app/services/quest.service';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  utente!: any;
  quests: Quest[] = [];
  requestList: Request[] = [];

  constructor(
    private authSrv: AuthService,
    private questSrv: QuestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });
    const uID = this.authSrv.getUserId();

    this.questSrv.getAllQuest(uID!).subscribe((all) => {
      this.quests = all;
      console.log(all);
    });
    this.questSrv.getRequestsByUserId(this.utente.user.id).subscribe(
      (requests) => {
        this.requestList = requests;
      },
      (error) => {
        console.error('Errore nella get delle richieste', error);
      }
    );
  }
  createNewQuest(){
    this.router.navigate(['/new-quest']);
  }
  checkRequest() {
    this.router.navigate(['/request']);
  }
  getRequestStateClass(requestId: number): string {
    const requestState = this.questSrv.getRequestState(requestId);
    return `request-${requestState}`;
  }
  seeRequest(requestId: number) {
    // Naviga alla singola richiesta
    this.router.navigate(['/single-request', requestId]);
  }
}

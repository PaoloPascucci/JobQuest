import { Component, OnInit } from '@angular/core';
import { QuestService } from 'src/app/services/quest.service';
import { Quest } from 'src/app/models/quest';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth-data';

@Component({
  selector: 'app-single-quest',
  templateUrl: './single-quest.component.html',
  styleUrls: ['./single-quest.component.scss'],
})
export class SingleQuestComponent implements OnInit {
  quest: Quest | undefined;
  utente!: AuthData | null;
  user = localStorage.getItem('user');

  constructor(
    private questSrv: QuestService,
    private authSrv: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const questId = Number(this.route.snapshot.paramMap.get('id'));
    this.questSrv.getSingleQuest(questId).subscribe((quest) => {
      this.quest = quest;
    });
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });
    this.authSrv.restore();
  }
  goBackHome() {
    this.router.navigate(['/home']);
  }
  goRequest() {
    this.router.navigate(['/request']);
  }
}

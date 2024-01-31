import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { QuestService } from 'src/app/services/quest.service';
import { Quest } from 'src/app/models/quest';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  utente!: any;
  quests: Quest[] = [];
  constructor(private authSrv: AuthService, private questSrv: QuestService, private router:Router) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });

    this.questSrv.getQuest().subscribe(
      (all) => {
        this.quests = all.sort((a,b)=> a.userId - b.userId);
      },
      (error) => {
        console.error('erroe nella get dei post', error);
      }
    );

    this.authSrv.restore();
  }
  modificaQuest(quest:Quest){
    console.log("modifica quest", quest);
    this.router.navigate(['/modifica-quest', quest.id])
  }
  eliminaQuest(quest: Quest): void {
    // Implementa la logica di cancellazione della quest
    console.log('Cancella la quest:', quest);
    // Implementa la logica di cancellazione e aggiorna la lista delle quest
    this.questSrv.cancellaQuest(quest.id).subscribe(
      () => {
        // Aggiorna la lista delle quest dopo la cancellazione
        this.questSrv.getQuest().subscribe(
          (all) => {
            this.quests = all;
          },
          (error) => {
            console.error('Errore nella get dei post', error);
          }
        );
      },
      (error) => {
        console.error('Errore nella cancellazione della quest', error);
      }
    );
  }
  onQuestModificata(modificata: Quest): void {
    // Esempio: Aggiorna la lista delle quest dopo la modifica
    this.questSrv.getQuest().subscribe(
      (all) => {
        this.quests = all;
      },
      (error) => {
        console.error('Errore nella get dei post', error);
      }
    );
  }
  
}


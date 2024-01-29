import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-modifica-quest',
  templateUrl: './modifica-quest.component.html',
  styleUrls: ['./modifica-quest.component.scss'],
})
export class ModificaQuestComponent implements OnInit {
  questId!: number;
  questForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private questSrv: QuestService) {
    // Inizializzazione del form nel costruttore
    this.questForm = this.fb.group({
      titolo: ['', Validators.required],
      descrizione: ['', Validators.required],
      data: ['', Validators.required],
      userId: [null],
    }) 
  }

  ngOnInit(): void {
    const paramMap = this.route.snapshot.paramMap;
    if (paramMap !== null) {
      const id = paramMap.get('id');
      if (id !== null) {
        this.questId = +id;
        console.log('ID della quest da modificare:', this.questId);

        // Recupera i dettagli della Quest da modificare e popola il form
        this.questSrv.getSingleQuest(this.questId).subscribe((quest) => {
          this.questForm.patchValue({
            titolo: quest.titolo,
            descrizione: quest.descrizione,
            data: quest.data,
            userId:quest.userId
          });
        });
      }
    }
  }
  onSubmit(): void {
    if (this.questForm.valid) {
      // Invia i dati modificati al backend
      this.questSrv.modificaQuest(this.questId, this.questForm.value).subscribe(
        (modificata) => {
          console.log('Quest modificata:', modificata);
          // Puoi aggiungere una logica di reindirizzamento o un messaggio di successo qui          
          this.router.navigate(["/home"])
        },
        (errore) => {
          console.error('Errore durante la modifica della Quest', errore);
          // Gestisci eventuali errori qui
        }
      );
    }
  }
}
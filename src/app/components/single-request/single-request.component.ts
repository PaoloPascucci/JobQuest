import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-single-request',
  templateUrl: './single-request.component.html',
  styleUrls: ['./single-request.component.scss'],
})
export class SingleRequestComponent implements OnInit {
  requestId: number | null = null;
  requestDetails: any; // Adatta questo tipo in base alla struttura della tua richiesta

  constructor(private route: ActivatedRoute, private questSrv: QuestService, private router:Router) {}

  ngOnInit(): void {
    // Ottieni l'ID della richiesta dalla route
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    // Verifica se l'ID è presente prima di convertirlo in numero
    if (idFromRoute !== null) {
      this.requestId = +idFromRoute;

      // Carica i dettagli della richiesta utilizzando l'ID
      this.questSrv.getSingleRequest(this.requestId).subscribe(
        (request) => {
          this.requestDetails = request;
        },
        (error) => {
          console.error('Errore nel recupero dei dettagli della richiesta', error);
        }
      );
    } else {
      console.error('ID della richiesta non presente nella route');
    }
  }
  goBackToProfile() {
    this.router.navigate(['/profile']);
  }

}
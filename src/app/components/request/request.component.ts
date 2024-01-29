import { Component, OnInit } from '@angular/core';
import { QuestService } from 'src/app/services/quest.service';
import { Request } from 'src/app/models/request';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  reQuests!: Request[];
  user = localStorage.getItem('user');
  form: FormGroup;
  utente!: AuthData | null;
  allUsers!: any[];
  showSuccessMessage = false;
  requestList: Request[] = [];
  constructor(
    private authSrv: AuthService,
    private fb: FormBuilder,
    private questSrv: QuestService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });
    this.loadQuest();

    this.authSrv.getAllUser().subscribe((all) => {
      this.allUsers = all;
    });
    this.questSrv.getRequest().subscribe(
      (requests) => {
        this.requestList = requests;
      },
      (error) => {
        console.error('Errore nella get delle richieste', error);
      }
    );
  }
  loadQuest() {
    if (this.user !== null) {
      const userData = JSON.parse(this.user);
      const userId = userData.user.id;

      this.questSrv.getRequest().subscribe((data) => {
        this.reQuests = data;
      });
    }
  }
  Submit() {
    if (this.user !== null) {
      const userData = JSON.parse(this.user);

      const data = {
        userId: userData.user.id,
        titolo: this.form.value.title,
        desc: this.form.value.body,
      };
      this.questSrv.requestCreate(data).subscribe((requestPost) => {
        console.log(requestPost);
        this.showSuccessMessage = true;

        this.form.reset();
        setTimeout(() => {
          this.loadQuest();
          this.router.navigate(['/home']);
        }, 3000);
      });
    }
  }
  goBack() {
    this.questSrv.goBackHome();
  }
  accetta(request: Request) {
    request.colore = "lime";
    request.disabilitaBottoni = true;
  }

  rifiuta(request: Request) {
    request.colore = 'red';
    request.disabilitaBottoni = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-new-quest',
  templateUrl: './new-quest.component.html',
  styleUrls: ['./new-quest.component.scss']
})
export class NewQuestComponent implements OnInit {
  user = localStorage.getItem('user');
  form: FormGroup;
  utente!: AuthData | null;
  showSuccessMessage = false;
  constructor( private authSrv: AuthService,
    private fb: FormBuilder,
    private questSrv: QuestService,
    private router: Router) {
      this.form = this.fb.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        data: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });    
  }
  Submit() {
    if (this.user !== null) {
      const userData = JSON.parse(this.user);

      const data = {
        userId: userData.user.id,
        titolo: this.form.value.title,
        descrizione: this.form.value.body,
        data:this.form.value.data,
      };
      this.questSrv.questCreate(data).subscribe((questPost) => {
        console.log(questPost);
        this.showSuccessMessage = true;

        this.form.reset();
        setTimeout(() => {          
          this.router.navigate(['/home']);
        }, 3000);
      });
    }
  }
}

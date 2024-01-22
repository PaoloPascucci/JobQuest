import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}
  registerErr: boolean = false;
  ngOnInit(): void {}

  registra(form: NgForm) {
    const data = {
      nome: form.value.nome,
      cognome: form.value.cognome,
      email: form.value.email,
      type: form.value.type,
      password: form.value.password,
    };

    console.log(form.value);
    try {
      this.authSrv.register(form.value).subscribe();
      this.router.navigate(['/login'])
    } catch (error: any) {
      console.log(error);
      alert(error);
      this.router.navigate(['/register']);
    }
  }
}

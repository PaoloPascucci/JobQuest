import { Injectable } from '@angular/core';
import { Quest } from '../models/quest';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AuthData } from '../auth/auth-data';
import { environment } from 'src/environments/environment';
import { Request } from '../models/request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  api = environment.apiURL;
  single!: Quest;
  constructor(private http: HttpClient, private router:Router) {}
  getAllQuest(userId: number) {
    return this.http.get<Quest[]>(`${this.api}/quests?userId=${userId}`);
  }
  getQuest() {
    return this.http.get<Quest[]>(`${this.api}/quests`);
  }
  getSingleQuest(id: number) {
    return this.http.get<Quest>(`${this.api}/quests/${id}`);
  }
  getProfilo(id: number) {
    return this.http.get<AuthData>(`${this.api}/users/${id}`);
  }
  getRequest() {
    return this.http.get<Request[]>(`${this.api}/requests`);
  }
  requestCreate(data: {
    userId: number;
    titolo: string;
    desc: string;
  }): Observable<Request> {
    return this.http.post<Request>(`${this.api}/requests`, data);
  }
  goBackHome(){
    this.router.navigate(['/home']);
  }
  
}

import { Injectable } from '@angular/core';
import { Quest } from '../models/quest';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AuthData } from '../auth/auth-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  api = environment.apiURL;
  single!: Quest;
  constructor(private http: HttpClient) {}
  getAllQuest(userId: number) {
    return this.http.get<Quest[]>(`${this.api}/quests?userId=${userId}`);
  }
  getQuest() {
    return this.http.get<Quest[]>(`${this.api}/quests`);
  }
  getSingleQuest(id: number) {
    return this.http.get<Quest>(`${this.api}/posts/${id}`);
  }
  getProfilo(id: number) {
    return this.http.get<AuthData>(`${this.api}/users/${id}`);
  }
}

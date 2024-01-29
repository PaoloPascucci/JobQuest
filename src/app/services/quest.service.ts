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
  private requestStates: Record<number, 'accepted' | 'rejected'> = {};

  constructor(private http: HttpClient, private router: Router) {}
  getAllQuest(userId: number) {
    return this.http.get<Quest[]>(`${this.api}/quests?userId=${userId}`);
  }
  getQuest() {
    console.log('Chiamata a getQuest');
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
  getSingleRequest(id:number) {
    return this.http.get<Request[]>(`${this.api}/requests/${id}`);
  }
  requestCreate(data: {
    userId: number;
    titolo: string;
    desc: string;
  }): Observable<Request> {
    return this.http.post<Request>(`${this.api}/requests`, data);
  }
  goBackHome() {
    this.router.navigate(['/home']);
  }
  modificaQuest(questId: number, questData: any): Observable<Quest> {
    return this.http.put<Quest>(`${this.api}/quests/${questId}`, questData);
  }
  cancellaQuest(questId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/quests/${questId}`);
  }

  getRequestsByUserId(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.api}/requests?userId=${userId}`);
  }
  getAcceptedRequestsByUserId(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>(
      `${this.api}/accepted-requests?userId=${userId}`
    );
  }

  getRejectedRequestsByUserId(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>(
      `${this.api}/rejected-requests?userId=${userId}`
    );
  }

  getRequestState(requestId: number): 'accepted' | 'rejected' | undefined {
    return this.requestStates[requestId];
  }

  acceptRequest(requestId: number): void {
    // Esegui l'operazione di accettazione sul backend
    // Aggiorna lo stato nella memoria del servizio
    this.requestStates[requestId] = 'accepted';
  }

  rejectRequest(requestId: number): void {
    // Esegui l'operazione di rifiuto sul backend
    // Aggiorna lo stato nella memoria del servizio
    this.requestStates[requestId] = 'rejected';
  }
}

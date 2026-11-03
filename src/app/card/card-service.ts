import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardData, CardResponse } from './card';

@Service()
export class CardService {
    http = inject(HttpClient);
    apiUrl = 'https://localhost:8080/cards';

    create(cardData: CardData): Observable<CardResponse> {
        return this.http.post<CardResponse>(this.apiUrl, cardData);
    }
}

// core
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Card } from './card';

@Injectable()
export class CardService {
    cardURL = "api/lists/cards";
    constructor(
        private http: HttpClient) { }

    createCard(card: Card): Observable<Card> {
        // List Id must be null for the Web API to assign an Id
        const newCard = { id: '', name: card.name, parentListId: card.parentListId };
        return this.http.post<Card>(this.cardURL, newCard, )
            .pipe(
                tap(data => console.log('createList: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteCard(cardData:any) {
        return this.http.delete(`${this.cardURL}/${cardData.listId}/${cardData.cardId}`).pipe(catchError(this.errorHandler));
    }

    moveCard(cardData:any) {
        let cardPramObj = new Object();
        cardPramObj["card"] = {
            "sourceListId": cardData.sourceListId, "targetListId": cardData.targetListId,
            "cardId": cardData.cardId
        };
        return this.http.post(`${this.cardURL}/move`, cardPramObj)
            .pipe(catchError(this.errorHandler));
    }

    getCardById(listId: string, cardId: string) {
        return this.http.get(`list/card/get/${listId}/${cardId}`).pipe(catchError(this.errorHandler));
    }
    getCardFromList(listId: string, cardId: string) {
        return this.http.post(`list/card`, { "listId": listId, "cardId": cardId })
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }
    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
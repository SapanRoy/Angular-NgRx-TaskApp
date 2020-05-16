import { Observable } from 'rxjs';
// core
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { List } from './list';


@Injectable()
export class ListService {
    listURL = "api/lists";

    constructor(
        private http: HttpClient,
    ) { }

    createList(list: List): Observable<List> {
        // List Id must be null for the Web API to assign an Id
        const newList = { id: '', name: list.name };
        return this.http.post<List>(this.listURL, newList, )
            .pipe(
                tap(data => console.log('createList: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getLists(): Observable<List[]> {
        return this.http.get<List[]>(this.listURL)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }
    deleteList(id: string) {
        return this.http.delete(`${this.listURL}/${id}`)
            .pipe(catchError(this.errorHandler));
    }
    getListById(id) {
        return this.http.get(`list/get/${id}`)
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

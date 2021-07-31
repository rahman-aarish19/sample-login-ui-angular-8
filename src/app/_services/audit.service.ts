import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuditService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${config.apiUrl}/audit`)
            .pipe(
                map(res => { return res; }),
                catchError(this.handleError)
            );
    }

    createAudit(payload) {

        return this.http.post<any>(`${config.apiUrl}/audit/add`, payload)
            .pipe(
                map(res => { return res; }),
                catchError(this.handleError)
            );
    }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            return throwError(error);
        } else {
            return throwError(error);
        }
    }
}
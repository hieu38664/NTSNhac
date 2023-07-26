import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ListDayOfWeek } from "../app.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'X-Content-Type-Options': 'nosniff' })
};
@Injectable({
    providedIn: 'root'
})

export class CallApiService {

    readonly APIUrl = "https://localhost:44377/api/nhac/";

    constructor(
        private http: HttpClient,
    ) { }

    getMusic(): Observable<any> {
        var tr = this.http.get<any>(this.APIUrl + 'get-Nhac', httpOptions);
        return tr;
    }

    createMusic(model: any): Observable<any> {
        return this.http.post<any>(this.APIUrl + 'add-Nhac', model, httpOptionsJson);
    }

    deleteMusic(id: string): Observable<any> {
        return this.http.delete<any>(this.APIUrl + `delete-Nhac/${id}`, httpOptions);
    }

    updateMusic(nhac: any): Observable<any> {
        return this.http.post<any>(this.APIUrl + 'update-Nhac', nhac, httpOptionsJson);
    }

    getNhacById(id: string): Observable<any> {
        return this.http.get<any>(this.APIUrl + `get-NhacBy/${id}`, httpOptions);
    }

    paginationMusic(model: any): Observable<any> {
        return this.http.post<any>(this.APIUrl + 'pagination-Nhac', model, httpOptions);
    }

    uploadMusic(file: File): any {
        const formData: FormData = new FormData();
        formData.append('files', file, file.name);
        return this.http.post(this.APIUrl + 'upload-Nhac', formData);
    }

    getDayOfWeek(): ListDayOfWeek[] {
        return [
            { id: 2, name: '2' },
            { id: 3, name: '3' },
            { id: 4, name: '4' },
            { id: 5, name: '5' },
            { id: 6, name: '6' },
            { id: 7, name: '7' },
        ];
    }
    
}
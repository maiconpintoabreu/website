import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CharacterService {

    constructor(private http: HttpClient) {
    }
    getCharacters() {
        return this.http.get<any>(environment.backend+'private/character');
    }
    createTestCharacters() {
        return this.http.post<any>(environment.backend+'private/character',{});
    }
}
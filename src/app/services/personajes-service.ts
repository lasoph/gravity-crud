import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../models/personajes.model';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  private apiUrl = `${environment.apiBaseUrl}/personajes`;
  
  constructor(private http: HttpClient){}

  getPersonajes(): Observable<Personaje[]>{
    return this.http.get<Personaje[]>(this.apiUrl);
  }

  crearPersonaje(personaje: Personaje): Observable<Personaje> {
    return this.http.post<Personaje>(this.apiUrl, personaje);
  }

  actualizarPersonaje(id: string, personaje: Personaje): Observable<void> {
    const { _id, ...body } = personaje;

    return this.http.put<void>(`${this.apiUrl}/${id}`, body);
  }

  eliminarPersonaje(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

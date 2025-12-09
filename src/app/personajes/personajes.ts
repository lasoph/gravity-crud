import { Component } from '@angular/core';
import { Personaje } from '../models/personajes.model';
import { PersonajesService } from '../services/personajes-service';

@Component({
  selector: 'app-personajes',
  standalone: false,
  templateUrl: './personajes.html',
  styleUrl: './personajes.css',
})
export class Personajes {
  personajes: Personaje[] = [];
  personaje: Personaje = { nombre: '', edad: '', sexo: '' };
  actualizado = false;
  idActualizacion: string | null = null;

  constructor(private personajesService: PersonajesService) { }

  ngOnInit(): void {
    this.getPersonajes();
  }

  getPersonajes() {
    this.personajesService.getPersonajes().subscribe(data => {
      this.personajes = data;
    });
  }

  guardarPersonaje() { if (!this.actualizado) 
    { this.personajesService.crearPersonaje(this.personaje).subscribe(() => 
      { this.personaje = { nombre: '', edad: '',sexo:'' }; 
      this.getPersonajes(); });
     } else { 
      if (this.idActualizacion) { 
        this.personajesService.actualizarPersonaje(this.idActualizacion, this.personaje).subscribe(() => { 
          this.actualizado = false; 
          this.idActualizacion = null; 
          this.personaje = { nombre: '', edad: '',sexo: '' };
           this.getPersonajes();
           }); 
          } 
        } 
      }
  
  
  actualizarPersonaje(p: Personaje) {
    this.actualizado = true;
    this.idActualizacion = p._id!;
    this.personaje = { nombre: p.nombre, edad: p.edad, sexo: p.sexo };
  }

  eliminarPersonaje(id: string) {
    this.personajesService.eliminarPersonaje(id).subscribe(() => {
      this.getPersonajes();
    });
  }
}
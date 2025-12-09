import { Component, inject, model } from '@angular/core';
import { Personaje } from '../models/personajes.model';
import { PersonajesService } from '../services/personajes-service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-personajes',
  standalone: false,
  templateUrl: './personajes.html',
  styleUrl: './personajes.css',
})
export class Personajes {
  personajes: Personaje[] = [];
  personaje: Personaje = { nombre: '', edad: '', altura: '', cabello: '', sexo: '', habilidades: ''};
  actualizado = false;
  idActualizacion:  string | null = null;
  modalEliminar: boolean = false;
  modalEditar: boolean = false;
  personajeSeleccionado: any = null;

  //faromulario reactivo
  fb = inject(FormBuilder);

  personajesForm: FormGroup = this.fb.group({
    nombre: ['',[Validators.required]],
    edad: ['',[Validators.required]],
    altura:  ['',[Validators.required]],
    cabello: ['',[Validators.required]],
    sexo: ['',[Validators.required]],
    habilidades: ['']
  })


  constructor(private personajesService: PersonajesService) {
   }


   abrirModalEliminar(personaje: any){
    this.personajeSeleccionado= personaje;
    this.modalEliminar==true;
   }
   abrirModalActualizar(personaje: any){
    this.personajeSeleccionado= personaje;
    this.modalEditar==false;
   }

   cerrarModalE(){
    this.modalEliminar=false;
   }
   cerrarModalA(){
    this.modalEditar=false;
   }


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
      { this.personaje = { nombre: '', edad: '', altura: '', cabello: '', sexo: '', habilidades: '' };
      this.getPersonajes(); });
     } else {
      if (this.idActualizacion) {
        this.personajesService.actualizarPersonaje(this.idActualizacion, this.personaje).subscribe(() => {
          this.actualizado = false;
          this.idActualizacion = null;
          this.personaje = { nombre: '', edad: '', altura: '', cabello: '', sexo: '', habilidades: '' };
           this.getPersonajes();
           });
          }
        }
      }


  actualizarPersonaje(p: Personaje) {
    this.actualizado = true;
    this.idActualizacion = p._id!;
    this.personaje = { nombre: p.nombre, edad: p.edad, altura: p.altura, cabello: p.cabello, sexo: p.sexo, habilidades: p.habilidades };
  }

  eliminarPersonaje(id: string) {
    this.personajesService.eliminarPersonaje(id).subscribe(() => {
      this.getPersonajes();
    });
  }
}

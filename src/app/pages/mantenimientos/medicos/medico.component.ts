import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Rxjs
import { delay } from 'rxjs';

// SweetAlert2
import Swal from 'sweetalert2';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Modelo
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

// Servicios
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales!: Hospital[];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  constructor (
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe({
      next: (hospitalId) => {
        this.hospitalSeleccionado = this.hospitales.find(hosp => hosp._id == hospitalId);
      } 
    })
  }

  // Obtener dato del medico
  cargarMedico (id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      )
      .subscribe({
        next: (medico: any): any => {
          if (!medico) {
            return this.router.navigateByUrl(`/dashboard/medicos`);
          }
          
          const { nombre, hospital: { _id } } = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ nombre, hospital: _id })
        }
      })
  }

  // Obtener dato del hospital
  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe({
      next: (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      }
    })
  }

  // Guardar medico
  guardarMedico() {
    const { nombre } =  this.medicoForm.value;

    // Si tenemos medicoSeleccionado
    if (this.medicoSeleccionado) {
      // Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data).subscribe({
        next: (resp) => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        }
      })
    } else {
      // Crear
      this.medicoService.crearMedico(this.medicoForm.value).subscribe({
        next: (resp: any) => {
          console.log(resp);
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        }
      })
    }
  }

}

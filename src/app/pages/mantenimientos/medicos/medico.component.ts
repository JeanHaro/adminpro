import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  cargarMedico (id: string) {
    this.medicoService.obtenerMedicoPorId(id).subscribe({
      next: (medico: any) => {
        console.log(medico);
        this.medicoSeleccionado = medico;
      }
    })
  }

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
    this.medicoService.crearMedico(this.medicoForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
      }
    })
  }

}

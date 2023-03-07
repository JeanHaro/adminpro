import { Component, OnInit } from '@angular/core';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Modelo
import { Hospital } from 'src/app/models/hospital.model';

// Servicios
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales!: Hospital[];

  constructor (
    private fb: FormBuilder,
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['Haro', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe({
      next: (hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
      }
    })
  }

  guardarMedico() {
    console.log(this.medicoForm.value);
  }

}

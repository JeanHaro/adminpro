import { Component, OnInit } from '@angular/core';

// Modelo
import { Medico } from 'src/app/models/medico.model';

// Servicios
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;

  constructor (
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  // TODO: Cargar hospitales
  cargarHospitales() {
    this.cargando = true;

    this.medicoService.cargarNMedicos().subscribe({
      next: (medicos) => {
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      }
    })
  }

  // TODO: Actualizar foto
  abrirModal (medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

}

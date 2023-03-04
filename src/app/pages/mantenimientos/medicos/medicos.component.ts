import { Component, OnDestroy, OnInit } from '@angular/core';

// Rxjs
import { delay, Subscription } from 'rxjs';

// SweetAlert2
import Swal from 'sweetalert2';

// Modelo
import { Medico } from 'src/app/models/medico.model';

// Servicios
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor (
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) { }

  ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(1000))
      .subscribe(img => this.cargarMedicos());
  }

  // TODO: Cargar hospitales
  cargarMedicos() {
    this.cargando = true;

    this.medicoService.cargarNMedicos().subscribe({
      next: (medicos) => {
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      }
    })
  }

  // TODO: Buscar medicos
  buscar (termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe({
      next: (resp: any[]) => {
        this.medicos = resp;
      }
    })
  }

  // TODO: Actualizar foto
  abrirModal (medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  // TODO: Borrar medico
  borrarMedico (medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está apunto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.medicoService.eliminarMedico(medico._id)
        .subscribe({
          next: (resp) => {
            this.cargarMedicos();
            
            Swal.fire(
              'Médico borrado', 
              `${ medico.nombre } fue eliminado correctamente`, 
              'success' 
            );
          },
          error: (err) => Swal.fire('Error', err.error.msg, 'error')
        })
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';

// Rxjs
import { delay, Subscription } from 'rxjs';

// SweetAlert2
import Swal from 'sweetalert2';

// Modelo
import { Hospital } from 'src/app/models/hospital.model';

// Servicio
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  private imgSubs!: Subscription;

  constructor (
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(1000))
      .subscribe(img => this.cargarHospitales())
  }

  // TODO: Cargar hospitales
  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe({
      next: (hospitales) => {
        this.cargando = false;
        this.hospitales = hospitales;
      }
    })
  }

  // TODO: Guardar hospital
  guardarCambios (hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe({
      next: (resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
    })
  }

  // TODO: Eliminar hospital
  eliminarHospital (hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id).subscribe({
      next: (resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      })
    })
  }

  // TODO: Crear hospital
  async abrirSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })
    
    // Si la cantidad de las letras en el input es mayor a 0
    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe({
        next: ((resp: any) => {
          this.hospitales.push(resp.hospital);
        })
      })
    }
  }

  // Actualizar foto
  abrirModal (hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }
}

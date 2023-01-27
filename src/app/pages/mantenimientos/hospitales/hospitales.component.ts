import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  constructor (private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.hospitalService.cargarHospitales().subscribe({
      next: (hospitales) => console.log(hospitales)
    })
  }

}

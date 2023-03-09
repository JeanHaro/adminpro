import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Models
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

// Servicios
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor (
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => this.busquedaGlobal(termino));
  }

  // Busqueda Global
  busquedaGlobal (termino: string) {
    this.busquedasService.busquedaGlobal(termino)
      .subscribe((resp: any) => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      })
  }
}

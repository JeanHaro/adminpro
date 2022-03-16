import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  public titulo: string | undefined;

  constructor (private router: Router) {
    this.getArgumentoRuta();
  }

  getArgumentoRuta() {
    // events - es un observable que emite eventos
    this.router.events
    .pipe(
      // instancia los eventos que tengan ActivationEnd
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null), // para obtener solo un ActivationEnd
      map((event: ActivationEnd) => event.snapshot.data) // obtenemos la data
    )
    .subscribe( ({ titulo }) => {
      this.titulo = titulo;
      // Para que el titulo de la página web se coloque el titulo
      document.title = `AdminPro - ${titulo}`;
    })
  }

  ngOnInit(): void {
  }

}

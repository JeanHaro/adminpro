import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string | undefined;
  public tituloSubs$: Subscription;

  constructor (private router: Router, /* private route: ActivatedRoute */) {
    this.tituloSubs$ = this.getArgumentoRuta()
                        .subscribe( ({ titulo }) => {
                          this.titulo = titulo;
                          // Para que el titulo de la página web se coloque el titulo
                          document.title = `AdminPro - ${titulo}`;
                        })
    // console.log(route.snapshot.children[0].data);   
  }

  ngOnDestroy(): void {
    // Para cuando se salga de las vistas, se desubscriba
    // Osea cuando se vaya a login o a register
    this.tituloSubs$.unsubscribe();
  }

  getArgumentoRuta() {
    // events - es un observable que emite eventos
    return this.router.events
            .pipe(
              // instancia los eventos que tengan ActivationEnd
              filter((event: any) => event instanceof ActivationEnd),
              filter((event: ActivationEnd) => event.snapshot.firstChild === null), // para obtener solo un ActivationEnd
              map((event: ActivationEnd) => event.snapshot.data) // obtenemos la data
            )
  }
}

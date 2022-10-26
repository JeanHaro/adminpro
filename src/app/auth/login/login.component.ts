import { Component } from '@angular/core';

import { Router } from '@angular/router';

// Formulario
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

// SweetAlert2
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
  public formSubmitted = false;

  // TODO: Como quiero que luzca mi formulario
  public loginForm = this.fb.group({
    // En la segunda parte del array se coloca el Validators para que valide el valor
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor (
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  // Iniciar sesión
  login() {
    this.usuarioService.login(this.loginForm.value)
    .subscribe({
      next: (resp) => {
        // Si la persona quiere recordar la contraseña
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        // console.log(resp);
      },
      error: (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    });
    // console.log(this.loginForm.value);
    // this.router.navigateByUrl('/');
  }
}

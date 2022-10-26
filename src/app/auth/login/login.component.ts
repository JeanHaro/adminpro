import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';

// Formulario
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

// SweetAlert2
import Swal from 'sweetalert2'

// TODO: any - porque no tenemos el tipado de datos
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit {

  // TODO: Referencia local
  @ViewChild('googleBtn') googleBtn?: ElementRef;

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

  ngAfterViewInit(): void {
    this.googleInit();
  }

  // TODO: Iniciar sesión en google
  googleInit() {
    google.accounts.id.initialize({
      client_id: "606644573622-a6ftkhriq4rp1ibbdkvfbia12f6u8djn.apps.googleusercontent.com",
      // auto_select:"true", // Inicia sesión automáticamente
      callback: this.handleCredentialResponse
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"), { 

      // Referencia local
      this.googleBtn?.nativeElement,
      {
        theme: "outline", 
        size: "large",
        type: "standard",
        shape: "rectangular",
        text: "${button.text}",
        logo_alignment: "left",
        context: "sign"
      },  // customization attributes
    );
  }

  // TODO: Función luego de iniciar sesión
  handleCredentialResponse (response: any) {
    // Obtener el token
    console.log(response.credential);
  }


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

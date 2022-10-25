import { Component } from '@angular/core';

// Formularios
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  // TODO: Como quiero que luzca mi formulario
  public registerForm = this.fb.group({
    // En la segunda parte del array se coloca el Validators para que valide el valor
    nombre: ['Jean', [Validators.required]],
    email: ['jeanch447@gmail.com', Validators.required],
    password: ['123456', [Validators.required]],
    password2: ['123456', Validators.required],
    terminos: [false, Validators.required]
  });

  constructor (private fb: FormBuilder) { }

  crearUsuario() {
    console.log(this.registerForm.value);
  }
}

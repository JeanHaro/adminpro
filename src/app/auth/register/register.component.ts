import { Component } from '@angular/core';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  // TODO: Como quiero que luzca mi formulario
  public registerForm = this.fb.group({
    // En la segunda parte del array se coloca el Validators para que valide el valor
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  }, { 
    Validators: this.passwordsIguales('password', 'password2')
  });

  constructor (private fb: FormBuilder) { }

  // Cuando comience a crear el usuario
  crearUsuario() {
    // TODO: Una manera rápida de saber de cuando el formulario se envió
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    // Verificar que el fromulario sea correcto al momento de enviar
    if (this.registerForm.valid) {
      console.log('Posteando formulario');
    } else {
      console.log('Formulario no es correcto...');
    }
  }

  // TODO: Si el campo  no es valido
  campoNoValido (campo: string): boolean {
    // Si el campo se envió y el campo no es valido
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: Validando las contraseñas
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    // Si las contraseñas son iguales
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: Si los términos es valido
  aceptaTerminos (): boolean {
    // Si los términos es false y el campo se envió
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  // TODO: Contraseñas iguales
  passwordsIguales (pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      // Si las contraseñas son iguales
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }
}

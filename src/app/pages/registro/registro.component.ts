import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface UsuarioRegistrado {
  username: string;
  email: string;
}

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {

  registroForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  usuarioRegistrado: UsuarioRegistrado | undefined;

  passwordsDistintas(): boolean {
    const { password, confirmPassword } = this.registroForm.getRawValue();
    return password !== confirmPassword;
  }

  onSubmit(form: FormGroupDirective) {
    this.registroForm.markAllAsTouched();

    if (this.registroForm.invalid || this.passwordsDistintas()) {
      return;
    }

    const { username, email } = this.registroForm.getRawValue();
    console.log('Registro simulado:', { username, email });
    this.usuarioRegistrado = { username, email };
    form.resetForm();
  }
}

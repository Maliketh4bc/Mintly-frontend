import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    username: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true}),
    password: new FormControl('', {nonNullable: true}),
    confirmPassword: new FormControl('', { nonNullable: true}),
  });

  usuarioRegistrado: UsuarioRegistrado | undefined;

  onSubmit() {
    const { username, email } = this.registroForm.getRawValue();

    console.log('Registro simulado:', {username, email});
    this.usuarioRegistrado = { username, email };
  }
}

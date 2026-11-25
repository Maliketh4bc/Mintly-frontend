import { Component, inject } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation } from '../../../models/reservation';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-recogida',
  imports: [HeaderComponent, ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './recogida.component.html',
  styleUrl: './recogida.component.css'
})
export class RecogidaComponent {
  private reservationService = inject(ReservationService);

  codeForm = new FormGroup({
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\s*mnt-[a-z0-9]{4}\s*$/i)]
    })
  });

  reservation: Reservation | undefined;
  searched = false;
  successMessage = '';

  buscar(): void {
    this.successMessage = '';
    this.codeForm.markAllAsTouched();

    if (this.codeForm.invalid) {
      return;
    }

    const code = this.codeForm.getRawValue().code.trim().toUpperCase();

    this.reservationService.getReservationByCode(code).subscribe(reservation => {
      this.reservation = reservation;
      this.searched = true;
    });
  }

  confirmar(form: FormGroupDirective): void {
    if (!this.reservation) {
      return;
    }

    this.reservationService.confirmPickup(this.reservation.id).subscribe(reservation => {
      this.successMessage = `Recogida confirmada: ${reservation?.cardName} para ${reservation?.customerName}.`;
      this.reservation = undefined;
      this.searched = false;
      form.resetForm();
    });
  }

}

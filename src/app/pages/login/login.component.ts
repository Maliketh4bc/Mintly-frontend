import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DesktopNoticeComponent } from '../../components/desktop-notice/desktop-notice.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, DesktopNoticeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);

  email = '';
  password = '';
  showPassword = false;
  sending = false;

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.sending = true;
    setTimeout(() => {
      this.sending = false;
      this.router.navigate(['/panel']);
    }, 600);
  }
}

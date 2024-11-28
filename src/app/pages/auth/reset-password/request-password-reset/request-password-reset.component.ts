import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PasswordResetService} from '../../../../core/services/password-reset.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton
  ],
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.css'
})
export class RequestPasswordResetComponent {
  resetForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private passwordResetService = inject(PasswordResetService);

  constructor() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  controlHasError(control: string, error: string) {
    return this.resetForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }

    const emailData = this.resetForm.value.email;
    this.passwordResetService.sendResetPasswordEmail(emailData).subscribe({
      next: () => {
        this.showSnackBar(
          'Si el correo está registrado, recibirás un enlace para restablecer la contraseña'
        );
      },
      error: () => {
        this.showSnackBar('Error al enviar el correo. Inténtalo nuevamente');
      },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

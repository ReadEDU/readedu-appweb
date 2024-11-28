import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PasswordResetService} from '../../../../core/services/password-reset.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    NgIf
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  tokenValid: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private passwordResetService = inject(PasswordResetService);

  constructor() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.checkToken();
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }

    const newPassword = this.resetForm.value.password;
    this.passwordResetService.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.snackBar.open(
          'Contraseña cambiada correctamente.',
          'Cerrar',
          { duration: 3000 }
        );
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.snackBar.open(
          'Error al cambiar la contraseña. Por favor, intenta de nuevo.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  private checkToken(): void {
    this.passwordResetService.checkTokenValidity(this.token).subscribe({
      next: (isValid) => {
        this.tokenValid = isValid;
        if (!this.tokenValid) {
          this.snackBar.open(
            'El enlace ha expirado. Por favor, solicita un nuevo enlace.',
            'Cerrar',
            { duration: 3000 }
          );
          this.router.navigate(['/auth/reset-password']);
        }
      },
      error: () => {
        this.snackBar.open(
          'Error al verificar el enlace. Por favor, intenta de nuevo.',
          'Cerrar',
          { duration: 3000 }
        );
        this.router.navigate(['/auth/reset-password']);
      },
    });
  }
}

// Importamos todos los módulos y servicios necesarios
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { UserProfile } from '../../models/user-profile.model';

// Decorador @Component define los metadatos del componente
@Component({
  selector: 'app-update-profile', // Selector utilizado en las plantillas para este componente
  standalone: true, // Indica que este componente es standalone (no depende de AppModule)
  imports: [
    MatButtonModule, MatInputModule, MatCardModule, MatSnackBarModule,
    RouterLink, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './update-profile.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./update-profile.component.css'] // Ruta de los estilos CSS
})
export class UpdateProfileComponent implements OnInit {
  // Declaramos el formulario que gestionará los datos del perfil del usuario
  profileForm: FormGroup;
  profile!: UserProfile; // Variable para almacenar el perfil del usuario

  // Inyectamos las dependencias necesarias usando `inject`
  private fb = inject(FormBuilder);
  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  // Constructor donde inicializamos el formulario
  constructor() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required], // Campo de nombre, obligatorio
      lastName: ['', Validators.required], // Campo de apellido, obligatorio
      email: ['', [Validators.required, Validators.email]], // Campo de email, obligatorio y con validación de formato
      biography: [''], // Campo de biografía, opcional
    });
  }

  // Implementamos el método `ngOnInit` que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.loadUserProfile(); // Cargamos el perfil del usuario al inicializar el componente
  }

  // Método para cargar el perfil del usuario desde el servicio
  private loadUserProfile(): void {
    const authData = this.authService.getUser(); // Obtenemos los datos de autenticación
    const userId = authData?.id; // Extraemos el ID del usuario autenticado

    // Verificamos si el usuario está autenticado
    if (userId) {
      // Llamamos al servicio para obtener el perfil del usuario
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile; // Guardamos el perfil recibido
          this.profileForm.patchValue(profile); // Rellenamos el formulario con los datos del perfil
        },
        error: () => {
          this.showSnackBar('Error al cargar el perfil del usuario.');
        }
      });
    } else {
      // Si no está autenticado, redirigimos al inicio de sesión
      this.showSnackBar('Usuario no autenticado.');
      this.router.navigate(['/auth/login']);
    }
  }

  // Método para comprobar si un control tiene un error específico
  controlHasError(controlName: string, errorName: string): boolean {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Verificamos si el formulario es válido antes de enviar
    if (this.profileForm.valid) {
      const updatedData = { ...this.profile, ...this.profileForm.value }; // Combinamos el perfil actual con los nuevos datos

      // Llamamos al servicio para actualizar el perfil del usuario
      this.userProfileService.updateUserProfile(this.profile.id, updatedData).subscribe({
        next: () => {
          this.showSnackBar('Perfil actualizado exitosamente.');
          this.router.navigate(['/reader/profile']); // Redirigimos a la página del perfil
        },
        error: (error) => {
          this.showSnackBar(error.error?.message || 'Error al actualizar el perfil.');
        }
      });
    }
  }

  // Método para mostrar un mensaje en una barra de notificación
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración de la notificación en milisegundos
    });
  }
}
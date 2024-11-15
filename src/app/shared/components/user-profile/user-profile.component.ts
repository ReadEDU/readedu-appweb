// Importamos todos los módulos y servicios necesarios
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../models/user-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar para mostrar notificaciones

// Decorador @Component que define los metadatos del componente
@Component({
  selector: 'app-user-profile', // Selector para usar este componente en la aplicación
  standalone: true, // Indica que este componente no depende de un módulo externo
  imports: [CommonModule], // Módulos que este componente utiliza
  templateUrl: './user-profile.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./user-profile.component.css'] // Ruta al archivo de estilos CSS
})
export class UserProfileComponent implements OnInit {
  // Variable para almacenar el perfil del usuario
  profile!: UserProfile;
  // El operador de aserción `!` se utiliza aquí para indicar al compilador TypeScript
  // que la variable `profile` no será null ni undefined una vez que sea inicializada.

  // Inyectamos los servicios necesarios utilizando la nueva sintaxis `inject`
  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar); // Inyectar MatSnackBar para mostrar mensajes

  // Método que se ejecuta automáticamente al inicializar el componente
  ngOnInit(): void {
    this.loadUserProfile(); // Llamamos al método para cargar el perfil del usuario
  }

  // Método para cargar el perfil del usuario desde el servicio
  loadUserProfile(): void {
    const authData = this.authService.getUser(); // Obtenemos los datos de autenticación
    const userId = authData?.id; // Extraemos el ID del usuario si está autenticado

    // Verificamos si el usuario tiene un ID válido
    if (userId) {
      // Llamamos al servicio para obtener los datos del perfil del usuario
      this.userProfileService.getUserProfile(userId).subscribe({
        // Si la solicitud es exitosa, asignamos los datos al perfil y mostramos un mensaje
        next: (profile) => {
          this.profile = profile; // Guardamos el perfil recibido
          this.showSnackBar('Perfil cargado con éxito'); // Mostramos un mensaje de éxito
        },
        // Si ocurre un error al cargar el perfil, mostramos un mensaje de error
        error: (error) => {
          this.showSnackBar('Error al cargar el perfil');
        }
      });
    } else {
      // Si no hay un usuario autenticado, redirigimos al inicio de sesión
      this.showSnackBar('Usuario no autenticado');
      this.router.navigate(['/auth/login']);
    }
  }

  // Método para navegar a la página de actualización del perfil
  navigateToUpdateProfile(): void {
    this.router.navigate(['/reader/profile/update']); // Redirige al usuario a la página para actualizar el perfil
  }

  // Método para mostrar mensajes en la barra de notificación
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración de la notificación en milisegundos
    });
  }
}
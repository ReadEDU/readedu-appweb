// Importamos todos los módulos y servicios necesarios
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { AuthRequest } from '../../../shared/models/auth-request.model';

// Decorador @Component para definir los metadatos del componente
@Component({
  selector: 'app-login', // El nombre del selector para usar este componente en los templates
  standalone: true, // Indica que es un componente standalone (Angular 15+)
  imports: [ // Importamos módulos necesarios para este componente
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html', // Ruta al archivo HTML del componente
  styleUrl: './login.component.css' // Ruta al archivo CSS del componente
})
export class LoginComponent {

  // Definimos un formulario llamado loginForm
  loginForm: FormGroup;

  // Inyectamos servicios utilizando la función inject() (Angular 16+)
  private fb = inject(FormBuilder); // Para construir el formulario
  private router = inject(Router); // Para la navegación entre rutas
  private snackBar = inject(MatSnackBar); // Para mostrar mensajes emergentes (notificaciones)
  private authService = inject(AuthService); // Servicio para la autenticación del usuario

  private readonly READER_ROLE = 'READER';
  private readonly CREATOR_ROLE = 'CREATOR';
  private readonly READER_ROUTE = '/reader/catalog';
  private readonly CREATOR_ROUTE = '/creator/articles/list';
  private readonly DEFAULT_ROUTE = '/home';

   constructor() {
    // Inicializamos el formulario con los campos y validaciones necesarias
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de correo electrónico con validación
      password: ['', [Validators.required]] // Campo de contraseña con validación
    });
  }

  // Método para verificar si un campo tiene un error específico
  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  // Método que se ejecuta cuando se envía el formulario
  onSubmit() {
    // Si el formulario no es válido, salimos de la función
    if (this.loginForm.invalid) {
      return;
    }

    // Obtenemos las credenciales del formulario
    const credentials: AuthRequest = this.loginForm.value;

    // Llamamos al método de inicio de sesión del servicio de autenticación
    this.authService.login(credentials).subscribe({
      // Si el inicio de sesión es exitoso
      next: () => {
        this.showSnackBar('Inicio de sesión exitoso'); // Mostramos un mensaje de éxito
        this.redirectUserBasedOnRole();// Navegamos a la página del lector
      },
      // Si hay un error durante el inicio de sesión
      error: () => {
        this.showSnackBar('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      }
    });
  }

  private redirectUserBasedOnRole(): void {
    const userRole = this.authService.getUserRole();

    if (userRole === this.READER_ROLE) {
      this.router.navigate([this.READER_ROUTE]);
    } else if (userRole === this.CREATOR_ROLE) {
      this.router.navigate([this.CREATOR_ROUTE]);
    } else {
      this.router.navigate([this.DEFAULT_ROUTE]);
    }
  }


  // Método para mostrar un mensaje emergente (snack bar)
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top' // Posición en la parte superior de la pantalla
    });
  }
}
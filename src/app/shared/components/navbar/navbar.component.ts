// Importamos los módulos necesarios desde Angular y nuestro servicio de autenticación
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

// Decorador @Component para definir metadatos del componente
@Component({
  selector: 'app-navbar', // Selector que se utiliza en los templates para referirse a este componente
  standalone: true, // Indica que es un componente standalone (Angular 15+), no necesita un módulo
  imports: [RouterLink, RouterOutlet], // Importamos RouterLink y RouterOutlet para manejar rutas en el template
  templateUrl: './navbar.component.html', // Ruta al archivo HTML de la plantilla
  styleUrl: './navbar.component.css' // Ruta al archivo CSS con estilos para este componente
})
export class NavbarComponent {

  // Inyectamos el servicio de autenticación usando la función inject (Angular 16+)
  private authService = inject(AuthService);

  // Propiedad para verificar si el usuario está autenticado
  isAuthenticated: boolean = false;

  // Método del ciclo de vida del componente que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Verificamos si el usuario está autenticado usando el servicio de autenticación
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  // Método para cerrar sesión
  logout(): void {
    // Llama al método de cierre de sesión en el servicio de autenticación
    this.authService.logout();
    // Cambiamos el estado de isAuthenticated a false para actualizar la interfaz
    this.isAuthenticated = false;
  }
}
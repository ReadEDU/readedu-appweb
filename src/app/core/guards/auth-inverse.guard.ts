import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado
  if (authService.isAuthenticated()) {
    // Obtiene el rol del usuario
    const userRole = authService.getUserRole();

    // Redirige según el rol del usuario
    if (userRole === 'CREATOR') {
      router.navigate(['/creator']); // Redirige a la página de creadores
    } else if (userRole === 'READER') {
      router.navigate(['/reader']); // Redirige a la página de lectores
    }

    // Bloquea el acceso a las rutas de autenticación si el usuario está autenticado
    return false;
  }

  // Permite el acceso a la ruta si el usuario no está autenticado
  return true;
};
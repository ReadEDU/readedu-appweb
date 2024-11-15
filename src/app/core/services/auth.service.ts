// Importamos los decoradores y módulos necesarios de Angular
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; // Importamos el archivo de entorno para obtener la URL base
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs'; // Importamos `Observable` para trabajar con datos asíncronos y `tap` para realizar acciones secundarias

// Importamos los servicios y modelos necesarios
import { StorageService } from './storage.service';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { RegisterResponse } from '../../shared/models/register-response.model';

// Decorador @Injectable indica que esta clase es un servicio que puede ser inyectado en otras partes de la aplicación
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class AuthService {

  // Definimos la URL base para las peticiones relacionadas con la autenticación
  private apiURL = `${environment.apiURL}/auth`;

  // Inyectamos las dependencias necesarias usando la función `inject`
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  // Constructor vacío ya que estamos usando la inyección directa con `inject`
  constructor() { }

  /**
   * Método para iniciar sesión
   * param authRequest - Objeto que contiene el correo y la contraseña del usuario
   * returns Observable<AuthResponse> - Observable con la respuesta del servidor
   */
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    // Realiza una solicitud POST al endpoint de inicio de sesión
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, authRequest).pipe(
      // `tap` se utiliza para almacenar los datos de autenticación en el local storage al recibir la respuesta
      tap(response => this.storageService.setAuthData(response))
    );
  }

  /**
   * Método para registrar un nuevo usuario
   * param registerRequest - Objeto con los datos de registro del usuario
   * returns Observable<RegisterResponse> - Observable con la respuesta del servidor
   */
  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    // Realiza una solicitud POST al endpoint de registro
    return this.http.post<RegisterResponse>(`${this.apiURL}/register/reader`, registerRequest);
  }

  /**
   * Método para cerrar sesión
   * Limpia los datos de autenticación del local storage
   */
  logout(): void {
    this.storageService.clearAuthData();
  }

  /**
   * Método para verificar si el usuario está autenticado
   * returns boolean - `true` si hay datos de autenticación en el local storage, `false` de lo contrario
   */
  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }

  /**
   * Método para obtener los datos del usuario autenticado
   * returns AuthResponse | null - Los datos de autenticación del usuario o `null` si no está autenticado
   */
  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }

  /**
   * Método para obtener el rol del usuario autenticado
   * returns string | null - El rol del usuario o `null` si no hay usuario autenticado
   */
  getUserRole(): string | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.role : null;
  }
}
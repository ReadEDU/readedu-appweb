// Importamos `Injectable` y `inject` de Angular para crear un servicio inyectable
import { Injectable, inject } from '@angular/core';
// Importamos `HttpClient` para hacer solicitudes HTTP
import { HttpClient } from '@angular/common/http';
// Importamos `Observable` para manejar datos asincrónicos de las solicitudes HTTP
import { Observable } from 'rxjs';

// Importamos el archivo de configuración `environment` que contiene la URL base
import { environment } from '../../../environments/environment';
// Importamos la interfaz `UserProfile` que representa el modelo de perfil de usuario
import { UserProfile } from '../../shared/models/user-profile.model';

// Decorador `@Injectable` para indicar que esta clase es un servicio inyectable
@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class UserProfileService {
  // Definimos la URL base para las solicitudes relacionadas con el perfil del usuario
  private baseURL = `${environment.apiURL}/user/profile`;

  // Usamos `inject()` para obtener una instancia de `HttpClient`
  private http = inject(HttpClient);

  /**
   * Método para obtener el perfil de un usuario por su `userId`
   * param userId - ID del usuario cuyo perfil se quiere obtener
   * returns Observable<UserProfile> - Un `Observable` que emite el perfil del usuario
   */
  getUserProfile(userId: number): Observable<UserProfile> {
    // Realizamos una solicitud GET a la API para obtener el perfil del usuario
    return this.http.get<UserProfile>(`${this.baseURL}/${userId}`);
  }

  /**
   * Método para actualizar el perfil del usuario
   * param userId - ID del usuario cuyo perfil se quiere actualizar
   * param profileData - Datos del perfil que se van a actualizar
   * returns Observable<UserProfile> - Un `Observable` que emite el perfil actualizado
   */
  updateUserProfile(
    userId: number,
    profileData: UserProfile
  ): Observable<UserProfile> {
    // Realizamos una solicitud PUT a la API para actualizar el perfil del usuario
    return this.http.put<UserProfile>(`${this.baseURL}/${userId}`, profileData);
  }
}
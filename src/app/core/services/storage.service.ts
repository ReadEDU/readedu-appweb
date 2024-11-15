// Importamos el decorador `Injectable` de Angular
import { Injectable } from '@angular/core';

// Importamos la interfaz `AuthResponse` que representa los datos de respuesta de autenticación
import { AuthResponse } from '../../shared/models/auth-response.model';

// Decorador `@Injectable` que indica que esta clase es un servicio inyectable en toda la aplicación
@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible globalmente en toda la aplicación
})
export class StorageService {
  // Definimos la clave que se usará para almacenar los datos en el `localStorage`
  private authKey = 'readedu_auth';

  // Constructor vacío porque no necesitamos inyectar ningún servicio aquí
  constructor() {}

  /**
   * Método para guardar los datos de autenticación en el `localStorage`
   * param data - Objeto que contiene los datos de autenticación (token, usuario, etc.)
   */
  setAuthData(data: AuthResponse): void {
    // Guardamos los datos como un string en `localStorage` usando JSON.stringify
    localStorage.setItem(this.authKey, JSON.stringify(data));
  }

  /**
   * Método para obtener los datos de autenticación del `localStorage`
   * returns AuthResponse | null - Devuelve los datos de autenticación si existen, o `null` si no hay datos
   */
  getAuthData(): AuthResponse | null {
    // Intentamos obtener los datos usando la clave `authKey`
    const data = localStorage.getItem(this.authKey);
    // Si hay datos, los parseamos a un objeto `AuthResponse` y lo devolvemos, de lo contrario, devolvemos `null`
    return data ? (JSON.parse(data) as AuthResponse) : null;
  }

  /**
   * Método para limpiar (eliminar) los datos de autenticación del `localStorage`
   * Esto se usa principalmente al cerrar sesión
   */
  clearAuthData(): void {
    // Eliminamos los datos del `localStorage` usando la clave `authKey`
    localStorage.removeItem(this.authKey);
  }
}
// Importamos los módulos necesarios de Angular Router
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Definimos las rutas para el módulo de autenticación (authRoutes)
export const authRoutes: Routes = [
    {
        path: '', // Ruta raíz del módulo de autenticación
        component: AuthLayoutComponent, // Componente que actúa como contenedor para las páginas de autenticación
        children: [ // Rutas hijas que dependen del layout principal
            { path: 'login', component: LoginComponent }, // Ruta para la página de inicio de sesión
            { path: 'register', component: RegisterComponent } // Ruta para la página de registro
        ]
    }
];
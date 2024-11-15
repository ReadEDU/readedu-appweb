import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes),
        canActivate:[authInverseGuard]
    },
    {
        path: 'reader',
        loadChildren: () => import('./pages/reader/reader.routes').then(c => c.readerRoutes),
        canActivate:[authGuard]
    }

];
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';
import { HomeComponent } from './pages/public-content/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
        canActivate:[authInverseGuard]
    },
    {
        path: 'reader',
        loadChildren: () => import('./pages/reader/reader.routes').then(m => m.readerRoutes),
        canActivate:[authGuard]
    },

    {
        path: 'creator',
        loadChildren: () => import('./pages/creator/creator.routes').then(m => m.creatorRoutes),
        canActivate: [authGuard]
      }

];
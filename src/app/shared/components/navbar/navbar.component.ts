import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  isReader: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isReader = this.authService.getUserRole() === 'READER';
  }


  getProfileRoute(): string {
    const role = this.authService.getUserRole(); // Obtenemos el rol del usuario
    // Redirige según el rol
    return role === 'CREATOR' ? '/creator/profile' : '/reader/profile';
  }

  // Método para cerrar sesión

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.isReader = false;
    this.router.navigate(['/home']);
  }

}
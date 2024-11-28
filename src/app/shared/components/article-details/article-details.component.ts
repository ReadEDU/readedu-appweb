import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { HomeService } from '../../../core/services/home.service';
import { ArticleDetailsResponse } from '../../models/article-details-response.model';
import { ArticleService } from '../../../core/services/article.service';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSnackBarModule, ApiImgPipe],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article!: ArticleDetailsResponse;
  @Input() articleId!: number;

  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);
  private homeService = inject(HomeService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);


  isAuthenticated = false;
  isReader: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isReader = this.authService.getUserRole() === 'READER';

    if (this.articleId) {
      this.loadArticleDetails(this.articleId);
    }
  }

  loadArticleDetails(articleId: number): void {
    this.homeService.getArticleDetailsById(articleId).subscribe({
      next: (data) => (this.article = data),
      error: () => this.showSnackBar('Error al cargar detalles del libro'),
    });
  }

  goBackToHome(): void {
    const routePath = this.isReader ? '/reader/catalog' : '/home';
    this.router.navigate([routePath]);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
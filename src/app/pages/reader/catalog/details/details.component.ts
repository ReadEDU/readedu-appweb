import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { HomeService } from '../../../../core/services/home.service';
import { ArticleDetailsResponse } from '../../../../shared/models/article-details-response.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ApiImgPipe
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  article?: ArticleDetailsResponse;
  newComment: string = '';
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private homeService = inject(HomeService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    const articleId = +this.route.snapshot.paramMap.get('id')!;
    this.loadArticle(articleId);
  }

  private loadArticle(articleId: number): void {
    this.homeService.getArticleDetailsById(articleId).subscribe({
      next: (article) => {
        this.article = article;
      },
      error: (error) => {
        console.error('Error loading article:', error);
        this.showSnackBar('Error al cargar el artículo');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/reader/catalog']);
  }

  submitComment(): void {
    if (!this.newComment.trim()) {
      this.showSnackBar('El comentario no puede estar vacío');
      return;
    }

    // TODO: Implementar la lógica de envío de comentarios cuando esté disponible el backend
    this.showSnackBar('Funcionalidad de comentarios en desarrollo');
    this.newComment = '';
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
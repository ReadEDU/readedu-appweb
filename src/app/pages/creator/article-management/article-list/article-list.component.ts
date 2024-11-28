import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ArticleDetailsResponse } from '../../../../shared/models/article-details-response.model';
import { ArticleService } from '../../../../core/services/article.service';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { PageableResponse } from '../../../../shared/models/pageable.response.model';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ApiImgPipe,
  ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: ArticleDetailsResponse[] = [];
  filteredArticles: ArticleDetailsResponse[] = [];
  filterText = '';

  displayedColumns: string[] = [
    'cover',
    'title',
    'creatorName',
    'categoryName',
    'actions',
  ];
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  private articleService = inject(ArticleService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(pageIndex: number = 0, pageSize: number = 5): void {
    this.articleService.paginateArticles(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<ArticleDetailsResponse>) => {
        this.articles = response.content;
        this.filteredArticles = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
        console.log(this.articles);
      },
      error: () => this.showSnackBar('Error al cargar la lista de articulos'),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredArticles = this.articles.filter((article) =>
      article.title.toLowerCase().includes(filterValue)
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadArticles(this.pageIndex, this.pageSize);
  }

  createNewArticle(): void {
    this.router.navigate(['/creator/articles/new']);
  }

  editArticle(articleId: number): void {
    this.router.navigate(['/creator/articles/edit', articleId]);
  }

  deleteArticle(articleId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este articulo?')) {
      this.articleService.deleteArticle(articleId).subscribe({
        next: () => {
          this.showSnackBar('Articulo eliminado exitosamente');
          this.loadArticles(this.pageIndex, this.pageSize);
        },
        error: () => this.showSnackBar('Error al eliminar el artículo'),
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
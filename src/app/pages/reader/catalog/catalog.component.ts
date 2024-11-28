import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../../core/services/home.service';
import { Router } from '@angular/router';
import { ArticleCardComponent } from '../../../shared/components/article-card/article-card.component';
import { ArticleDetailsResponse } from '../../../shared/models/article-details-response.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ArticleCardComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  recentArticles: ArticleDetailsResponse[] = [];
  filteredArticles: ArticleDetailsResponse[] = [];
  searchQuery: string = '';

  private articleService = inject(HomeService);

  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.articleService.getRecentArticles().subscribe({
      next: (articles) => {
        this.recentArticles = articles;
        this.filteredArticles = articles;
      },
      error: (error) =>
        console.error('Error al cargar los articulos recientes', error),
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredArticles = this.recentArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.creatorName.toLowerCase().includes(query)
    );
  }
}
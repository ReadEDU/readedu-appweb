import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../../core/services/home.service';
import { Router } from '@angular/router';
import { ArticleDetailsResponse } from '../../../shared/models/article-details-response.model';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ApiImgPipe
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  recentArticles: ArticleDetailsResponse[] = [];
  filteredArticles: ArticleDetailsResponse[] = [];
  searchQuery: string = '';

  private articleService = inject(HomeService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getRecentArticles().subscribe({
      next: (articles) => {
        this.recentArticles = articles;
        this.filteredArticles = articles;
      },
      error: (error) => console.error('Error al cargar los artículos', error)
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredArticles = this.recentArticles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.creatorName.toLowerCase().includes(query)
    );
  }

  viewArticleDetails(articleId: number): void {
    this.router.navigate(['/reader/catalog/details', articleId]);
  }
}
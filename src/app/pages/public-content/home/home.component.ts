import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../../core/services/home.service';
import { ArticleDetailsResponse } from '../../../shared/models/article-details-response.model';
import { ArticleCardComponent } from '../../../shared/components/article-card/article-card.component';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ArticleCardComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentArticles: ArticleDetailsResponse[] = [];
  filteredArticles: ArticleDetailsResponse[] = [];
  searchQuery: string = '';

  private articleService = inject(HomeService);

  constructor() {}

  ngOnInit(): void {
    this.articleService.getRecentArticles().subscribe({
      next: (articles) => {
        this.recentArticles = articles;
        this.filteredArticles = articles;
      },
      error: (error) => console.error('Error al cargar los articulos recientes', error)
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredArticles = this.recentArticles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.creatorName.toLowerCase().includes(query)
    );
  }
}
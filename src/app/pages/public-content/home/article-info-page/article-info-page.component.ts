import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-info-page',
  standalone: true,
  imports: [ArticleDetailsComponent, ArticleReviewsComponent],
  templateUrl: './article-info-page.component.html',
  styleUrl: './article-info-page.component.css'
})
export class ArticleInfoPageComponent {
  articleId: number;
  private route=inject(ActivatedRoute);

  constructor() {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
  }
}
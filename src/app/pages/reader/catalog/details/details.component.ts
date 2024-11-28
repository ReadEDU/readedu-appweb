import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailsComponent } from '../../../../shared/components/article-details/article-details.component';
import { ArticleReviewsComponent } from '../../../../shared/components/article-reviews/article-reviews.component';

@Component({
  selector: 'app-article-info-page',
  standalone: true,
  imports: [ArticleDetailsComponent, ArticleReviewsComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class DetailsComponent {
  articleId: number;
  private route=inject(ActivatedRoute);

  constructor() {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.articleId);
  }
}
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ArticleDetailsResponse } from '../../models/article-details-response.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [MatCardModule, ApiImgPipe],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
})
export class ArticleCardComponent {
  @Input() article!: ArticleDetailsResponse;
  isReader: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.isReader = this.authService.getUserRole() === 'READER';
  }

  viewDetails() {
    const routePath = this.isReader
      ? '/reader/catalog/details'
      : '/home/article-details';
    this.router.navigate([routePath, this.article.id]);
  }
}
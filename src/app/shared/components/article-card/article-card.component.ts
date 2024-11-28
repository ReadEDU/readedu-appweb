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
  @Input() book!: ArticleDetailsResponse;
  isCustomer: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.isCustomer = this.authService.getUserRole() === 'CUSTOMER';
  }

  viewDetails() {
    const routePath = this.isCustomer
      ? '/reader/catalog/details'
      : '/home/article-details';
    this.router.navigate([routePath, this.book.id]);
  }
}
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article-reviews',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './article-reviews.component.html',
  styleUrls: ['./article-reviews.component.css'],
})
export class ArticleReviewsComponent implements OnInit {
  @Input() articleId!: number;

  //TO-DO: En su caso debe extraer los datos del api rest- es el unico componente que no esta conectado con el API
  reviews = [
    {
      reviewer: 'Juan Pérez',
      date: '2024-12-01',
      rating: 4,
      comment: 'Excelente Articulo, muy bien explicado y fácil de entender.',
    },
    {
      reviewer: 'Ana González',
      date: '2024-12-13',
      rating: 5,
      comment: 'Una guía completa y detallada. Me ayudó mucho en mi proyecto.',
    },
    {
      reviewer: 'Luis Mendoza',
      date: '2024-12-15',
      rating: 3,
      comment:
        'Buen articulo, aunque algunos temas podrían tener más profundidad.',
    },
    {
      reviewer: 'María Lopez',
      date: '2024-12-25',
      rating: 4,
      comment: 'Lo recomendaría a cualquier estudiante de programación.',
    },
  ];

  ngOnInit(): void {
    console.log('Reseñas del Articulo ID:', this.articleId);
  }
}
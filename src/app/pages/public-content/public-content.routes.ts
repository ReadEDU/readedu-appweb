import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleInfoPageComponent } from './home/article-info-page/article-info-page.component';
import { LayoutComponent } from './layout/layout.component';

export const publicContentRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'articles', component: ArticlesComponent },
      {
        path: 'article-details/:id',
        component: ArticleInfoPageComponent
      },
    ]
  }
];
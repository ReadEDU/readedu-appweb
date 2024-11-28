import { Routes } from '@angular/router';

import { LayoutComponent } from './creator-layout/layout.component';
import { ArticleListComponent } from './article-management/article-list/article-list.component';
import { CategoryFormComponent } from './category-management/category-form/category-form.component';
import { CategoryListComponent } from './category-management/category-list/category-list.component';
import  ArticleFormComponent  from './article-management/article-form/article-form.component';

export const creatorRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'articles/new', component: ArticleFormComponent },
      { path: 'articles/edit/:id', component: ArticleFormComponent },
      { path: 'articles/list', component: ArticleListComponent },

      { path: 'categories/new', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },
      { path: 'categories/list', component: CategoryListComponent },
    ],
  },
];
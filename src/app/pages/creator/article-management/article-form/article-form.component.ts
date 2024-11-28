import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { ArticleService } from '../../../../core/services/article.service';
import { MediaService } from '../../../../core/services/media.service';
import { CategoryService } from '../../../../core/services/category.service';
import { AuthService } from '../../../../core/services/auth.service';

import { CategoryResponse } from '../../../../shared/models/category-response.model';
import { ArticleCreateUpdateRequest } from '../../../../shared/models/article-create-update-request';
import { ArticleDetailsResponse } from '../../../../shared/models/article-details-response.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ApiImgPipe,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export default class ArticleFormComponent  {
  private articleService = inject(ArticleService);
  private mediaService = inject(MediaService);
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);


  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  categories: CategoryResponse[] = [];
  errors: string[] = [];
  articleId?: number;
// No se encuentra el id del creador
  form: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(250)],
    ],
    slug: ['', [Validators.required, Validators.pattern('[a-z0-9-]+')]],
    content: ['', [Validators.required]],
    coverPath: ['', Validators.required],
    filePath: ['', Validators.required],
    categoryId: ['', Validators.required],
  });

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        if (this.articleId) this.loadArticleForEdit();
      },
      error: () => this.errors.push('Error al cargar las categorías.'),
    });
    console.log(this.categories);
  }

  private loadArticleForEdit(): void {
    this.articleService.getArticleDetailsById(this.articleId!).subscribe({
      next: (article: ArticleDetailsResponse) => {
        const category = this.categories.find(
          (cat) => cat.name === article.categoryName
        );
        if (category) {
          this.form.patchValue({
            ...article,
            categoryId: category.id,
          });
        }
      },
      error: () => this.errors.push('Error al cargar los detalles del artículo.'),
    });
  }

  uploadFile(event: Event, control: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.mediaService.upload(formData).subscribe({
        next: (response) => this.form.controls[control].setValue(response.path),
        error: () => this.errors.push('Error al cargar el archivo.'),
      });
    }
  }

  createSlug(): void {
    const slug = this.form
      .get('title')
      ?.value.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
    this.form.get('slug')?.setValue(slug);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData: ArticleCreateUpdateRequest = {
      ...this.form.value,
      creatorId: this.authService.getUser()?.id,
    };

    const request: Observable<ArticleDetailsResponse> = this.articleId
      ? this.articleService.updateArticle(this.articleId, formData)
      : this.articleService.createArticle(formData);

    request.subscribe({
      next: () => {
        this.snackBar.open('Artículo guardado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/creator/articles/list']);
      },
      error: (error) => {
        this.errors = error.error.errors || ['Error al guardar el artículo'];
        this.snackBar.open('Error al guardar el artículo', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
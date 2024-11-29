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
export default class ArticleFormComponent implements OnInit {
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
  isUploading = false;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
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
      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', file);
      
      this.mediaService.upload(formData).subscribe({
        next: (response) => {
          this.form.controls[control].setValue(response.path);
          this.isUploading = false;
          this.showSnackBar('Archivo subido correctamente');
        },
        error: () => {
          this.errors.push('Error al cargar el archivo.');
          this.isUploading = false;
          this.showSnackBar('Error al subir el archivo');
        }
      });
    }
  }

  createSlug(): void {
    const title = this.form.get('title')?.value;
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      this.form.get('slug')?.setValue(slug);
    }
  }

  save(): void {
    if (this.form.invalid || this.isUploading) {
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
        this.showSnackBar('Artículo guardado exitosamente');
        this.router.navigate(['/creator/articles/list']);
      },
      error: (error) => {
        this.errors = error.error.errors || ['Error al guardar el artículo'];
        this.showSnackBar('Error al guardar el artículo');
      },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
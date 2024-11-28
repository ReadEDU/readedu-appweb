import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryRequest } from '../../shared/models/category-request.model';
import { CategoryResponse } from '../../shared/models/category-response.model';
import { PageableResponse } from '../../shared/models/pageable.response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiURL = `${environment.apiURL}/admin/categories`;
  private http = inject(HttpClient);

  constructor() {}

  getAllCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.apiURL);
  }

  paginateCategories(
    page: number,
    size: number
  ): Observable<PageableResponse<CategoryResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageableResponse<CategoryResponse>>(
      `${this.apiURL}/page`,
      { params }
    );
  }

  getCategoryById(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiURL}/${id}`);
  }

  createCategory(category: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.apiURL, category);
  }

  updateCategory(
    id: number,
    category: CategoryRequest
  ): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${this.apiURL}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
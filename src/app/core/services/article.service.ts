import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArticleCreateUpdateRequest } from '../../shared/models/article-create-update-request';
import { ArticleDetailsResponse } from '../../shared/models/article-details-response.model';
import { PageableResponse } from '../../shared/models/pageable.response.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseURL = `${environment.apiURL}/admin/articles`;
  private http = inject(HttpClient);

  getArticleDetails(): Observable<ArticleDetailsResponse[]> {
    return this.http.get<ArticleDetailsResponse[]>(`${this.baseURL}`);
  }

  paginateArticles(page: number, size: number): Observable<PageableResponse<ArticleDetailsResponse>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageableResponse<ArticleDetailsResponse>>(`${this.baseURL}/page`,
      { params });
  }

  createArticle(article: ArticleCreateUpdateRequest): Observable<ArticleDetailsResponse> {
    return this.http.post<ArticleDetailsResponse>(`${this.baseURL}`, article);
  }


  getArticleDetailsById(id: number): Observable<ArticleDetailsResponse> {
    return this.http.get<ArticleDetailsResponse>(`${this.baseURL}/${id}`);
  }


  updateArticle(id: number, article: ArticleCreateUpdateRequest): Observable<ArticleDetailsResponse> {
    return this.http.put<ArticleDetailsResponse>(`${this.baseURL}/${id}`, article);
  }


  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

}
// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArticleDetailsResponse } from '../../shared/models/article-details-response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseURL = `${environment.apiURL}/articles`;

  constructor(private http: HttpClient) {}

  getRecentArticles(): Observable<ArticleDetailsResponse[]> {
    return this.http.get<ArticleDetailsResponse[]>(`${this.baseURL}/recent`);
  }

  getArticleDetailsById(id: number): Observable<ArticleDetailsResponse> {
    return this.http.get<ArticleDetailsResponse>(`${this.baseURL}/${id}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

import { TopHeadlines } from './types/TopHeadlines';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  // This is for demo purposes. Don't put your API key in a frontend service..
  apiKey: string = 'Get your API key for free: https://newsapi.org/register/';
  apiKeyNotSharedInRepo = require('./apiKey.json')['API-KEY'];

  constructor(private httpClient: HttpClient) { }

  getNews(pageSize: string = "10", page: string = "1"){
    return this.httpClient.get<TopHeadlines>(`https://newsapi.org/v2/top-headlines?pageSize=${parseInt(pageSize)}&page=${parseInt(page)}&sources=techcrunch&apiKey=${this.apiKeyNotSharedInRepo ? this.apiKeyNotSharedInRepo : this.apiKey}`).pipe(map( x => x.articles));
  }
}
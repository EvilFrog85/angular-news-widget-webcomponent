import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';

import { NewsDataService } from '../news-data.service';

import { Article } from '../types/Article';
import { TopHeadlines } from '../types/TopHeadlines';

@Component({
  selector: 'news-widget',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  articles: Article[] = [];

  constructor(private newsDataService: NewsDataService) { }
  ngOnInit() {
    this.newsDataService.getNews().pipe(take(1)).subscribe((data: TopHeadlines) => {
      this.articles = data.articles;
    });
  }
}
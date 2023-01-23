import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';

import { NewsDataService } from '../news-data.service';

import { Article } from '../types/Article';

@Component({
  selector: 'news-widget',
  template: `
    <div *ngFor="let article of articles">
      <h2>{{ article.title }}</h2>

      <img class="news-widget-thumbnail" [src]="article.urlToImage" [alt]="article.title" />

      <p>{{ article.description }}</p>

      <a [href]="article.url">Read full article</a>
  </div>
  `,
  styles: [`
    .news-widget-thumbnail {
      width: 160px;
    }
  `]
})
export class NewsComponent implements OnInit {
  @Input() pageSize: string | undefined = undefined;
  @Input() page: string | undefined = undefined;

  @Output() hasLoaded = new EventEmitter<void>();

  articles: Article[] = [];

  constructor(private newsDataService: NewsDataService) {}

  ngOnInit() {
    if (this.pageSize && this.page) {
      this.newsDataService.getNews(this.pageSize, this.page).pipe(take(1)).subscribe((data: Article[]) => {
        this.articles = data;
        this.hasLoaded.emit();
      });
    }
  }
}
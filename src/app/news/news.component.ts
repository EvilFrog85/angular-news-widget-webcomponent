import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';

import { NewsDataService } from '../news-data.service';

import { Article } from '../types/Article';

@Component({
  selector: 'news-widget',
  template: `
    <div *ngFor="let article of articles" class="article-container">
      <img class="article-thumbnail" [src]="article.urlToImage" [alt]="article.title" />
      <h3 class="article-header">{{ article.title }}</h3>
      <p class="article-desc">{{ article.description }}</p>
      <a class="article-link" [href]="article.url" target="_blank">Read full article</a>
  </div>
  `,
  styles: [`
    .article-container {
      display: grid;
      grid-template-rows: minmax(26px, auto) minmax(46px, auto) minmax(20px, auto);
      grid-template-columns: 200px minmax(auto, 360px);
      grid-gap: 12px;
      margin-bottom: 44px;
      border-top: 1px solid #888;
      padding-top: 20px;
      box-sizing: border-box;
    }
      .article-thumbnail {
        grid-row: 1/4;
        grid-column: 1;
        width: 100%;
        align-self: center;
      }
      .article-header {
        grid-row: 1;
        grid-column: 2;
        font-size: 18px;
        text-shadow: 0 0 2px #000;
      }
      .article-desc {
        grid-row: 2;
        grid-column: 2;
        font-size: 12px;
      }
      .article-link {
        grid-row: 3;
        grid-column: 2;
        font-size: 14px;
        color: hsl(234, 43%, 56%);
      }
        .article-link:hover {
          color: hsl(234, 66%, 40%);
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
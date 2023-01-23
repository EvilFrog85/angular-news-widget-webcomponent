import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Injector} from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsDataService } from './news-data.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [NewsComponent],
  //bootstrap: [AppComponent, NewsComponent]
  providers: [NewsDataService]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(NewsComponent, { injector: this.injector });
    customElements.define('news-widget', el);
  }
}

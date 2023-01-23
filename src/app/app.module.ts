import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Injector} from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent, NewsComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(NewsComponent, { injector });
    customElements.define('news-widget', el);
  }
  ngDoBootstrap() {}
}

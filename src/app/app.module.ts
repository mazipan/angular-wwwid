import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomePage } from './pages/home/home.component';
import { CategoriesPage } from './pages/categories/categories.component';
import { PostPage } from './pages/post/post.component';
import { AboutPage } from './pages/about/about.component';
import { NotFoundPage } from './page-not-found.component';

import { PostDetailComponent } from './components/post-detail/post-detail.component';

import { ArticleService } from './services/article-service'
import { RouteService } from './services/route-service'

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    CategoriesPage,
    PostPage,
    AboutPage,
    NotFoundPage,

    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ArticleService,
    RouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

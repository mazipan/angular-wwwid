import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomePage } from './pages/home/home.component';
import { CategoriesPage } from './pages/categories/categories.component';
import { PostPage } from './pages/post/post.component';
import { AboutPage } from './pages/about/about.component';
import { NotFoundPage } from './page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'categories/:categoryId', component: CategoriesPage },
  { path: 'post/:slug', component: PostPage },
  { path: 'about', component: AboutPage },
  { path: '**', pathMatch: 'full', component: NotFoundPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

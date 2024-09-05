import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from './enums/paths.enum';
import { PostsComponent } from './containers/posts/posts.component';

const routes: Routes = [
  {
    path: Paths.Home,
    title: 'Klipclub | Home',
    component: PostsComponent
  },
  {
    path: Paths.Undefined,
    title: "Klipclub | Page not found",
    redirectTo: Paths.Home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

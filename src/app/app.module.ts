import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostsComponent } from './containers/posts/posts.component';
import { ModalCreatePostComponent } from './components/posts/modal-create-post/modal-create-post.component';
import { PostCardComponent } from './components/posts/post-card/post-card.component';
import { EditingAttachmentsComponent } from './components/posts/editing-attachments/editing-attachments.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostsComponent,
    ModalCreatePostComponent,
    PostCardComponent,
    EditingAttachmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    ImageCropperComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

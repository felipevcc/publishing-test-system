import { Component, ViewChild } from '@angular/core';
import { ModalCreatePostComponent } from 'src/app/components/posts/modal-create-post/modal-create-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  @ViewChild('modalCreatePostComponent') modalCreatePostComponent!: ModalCreatePostComponent;

  openModal() {
    this.modalCreatePostComponent.open();
  }
}

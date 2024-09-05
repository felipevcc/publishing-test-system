import { Component, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ModalCreatePostComponent } from 'src/app/components/posts/modal-create-post/modal-create-post.component';
import { Post } from 'src/app/models/post/post.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  @ViewChild('modalCreatePostComponent') modalCreatePostComponent!: ModalCreatePostComponent;
  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
    // Sort by created at
    this.posts$ = this.postService.getPosts().pipe(
      map(posts => posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
    );
  }

  ngOnInit() {}

  openModal() {
    this.modalCreatePostComponent.open();
  }
}

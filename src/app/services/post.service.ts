import { Injectable } from '@angular/core';
import { Post } from '../models/post/post.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(this.posts);

  constructor() { }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  addPost(post: Post): void {
    post.createdAt = new Date();
    this.posts.push(post);
    this.postsSubject.next(this.posts);
  }
}

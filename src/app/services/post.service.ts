import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MockBackendService, Post } from './mock.backend.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private mockBackendService: MockBackendService) {}

  addPost(post: Post): Observable<Post> {
    return this.mockBackendService.addPost(post);
  }

  getPosts(): Observable<Post[]> {
    return this.mockBackendService.getPosts();
  }
  getPostsByUsername(username: string): Observable<Post[]> {
    return this.mockBackendService.getPosts().pipe(
      map(posts => posts.filter(post => post.name === username))
    );
  }
}
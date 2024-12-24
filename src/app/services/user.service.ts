import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MockBackendService, Post, User } from './mock.backend.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User | null = null;

  constructor( private mockBackendService: MockBackendService) {}

  // Authenticate user
  authenticate(username: string, password: string): Observable<boolean> {
    return this.mockBackendService.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        this.currentUser = user || null;
        return !!user;
      })
    );
  }

  // Register a new user
  register(username: string, password: string, name: string): Observable<boolean> {
    const newUser: User = { username, password, name, posts: [], following: [] };
    return this.mockBackendService.addUser(newUser);
  }

  // Get current user's posts
  getCurrentUserPosts(): Post[] {
    if (!this.currentUser) {
      throw new Error('No user is currently logged in');
    }
    return this.currentUser.posts;
  }

  // Get current user
  getCurrentUser(): User {
    if (!this.currentUser) {
      throw new Error('No user is currently logged in');
    }
    return this.currentUser;
  }

  // Add a post for the current user
  addPost(content: Post) {
    if (!this.currentUser) {
      throw new Error('No user is currently logged in');
    }
    this.currentUser.posts.push(content);
  }
}
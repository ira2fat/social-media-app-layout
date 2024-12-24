import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  username: string;
  password: string;
  name: string;
  posts: Post[];
  following: string[];
}

export interface Post {
  id: number;
  name:string;
  content: string;
  mediaUrl?: string;
  likes: number;
  comments: string[];
  showComments: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {
    private users: User[] = [
        {
          username: 'user1',
          name: 'John Doe',
          password: 'password1',
          posts: [
            {
              id: 1,
              name:'John Doe',
              content: 'Hello, this is my first post!',
              likes: 10,
              comments: ['Nice post!', 'Welcome!'],
              showComments: true,
              timestamp: new Date('2023-01-01T10:00:00')
            },
            {
              id: 2,
              name:'John Doe',
              content: 'Enjoying a sunny day at the beach.',
              likes: 20,
              comments: ['Looks fun!', 'Wish I was there!'],
              showComments: true,
              timestamp: new Date('2023-02-15T14:30:00')
            }
          ],
          following: ['Mohamed Eldakar', 'Alex Addams']
        },
        {
          username: 'user2',
          name: 'Mohamed Eldakar',
          password: 'password2',
          posts: [
            {
                id: 3,
                name:'Mohamed Eldakar',
                content: 'Just finished a great book!',
                likes: 15,
                comments: ['What book?', 'Sounds interesting!'],
                showComments: true,
                timestamp: new Date('2023-03-10T18:45:00')
              }
            ],
            following: ['John Doe']
          },
          {
            username: 'user3',
            name: 'Alex Addams',
            password: 'password3',
            posts: [
              {
                id: 4,
                name:'Alex Addams',
                content: 'Had an amazing workout session today.',
                likes: 25,
                comments: ['Great job!', 'Keep it up!'],
                showComments: true,
                timestamp: new Date('2023-04-05T07:20:00')
              }
            ],
            following: ['John Doe', 'Mohamed Eldakar']
          }
        ];

        private posts: Post[] = this.users.flatMap(user => user.posts);

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  addUser(user: User): Observable<boolean> {
    const userExists = this.users.some((u) => u.username === user.username);
    if (!userExists) {
      this.users.push(user);
      return of(true);
    } else {
      return of(false);
    }
  }

  addPost(post: Post): Observable<Post> {
    post.id = this.posts.length + 1;
    post.timestamp = new Date();
    this.posts.push(post);
    return of(post);
  }
}
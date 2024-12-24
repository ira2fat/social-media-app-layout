import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { MatListModule } from '@angular/material/list';
import { Post, User } from '../../services/mock.backend.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatFormFieldModule,FormsModule, MatToolbarModule, MatListModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
  posts: Post[] = [];
  followingList: string[] = [];
  user: User = {
    username: '',
    password: '',
    name:'',
    posts: [],
    following: []
  };

  constructor(private userService: UserService, private router:Router, private postService:PostService) {
      this.user = this.userService.getCurrentUser();
      this.postService.getPostsByUsername(this.user.name).subscribe(posts => {
        this.posts = posts;
      });
      this.followingList = this.user.following;
  }
  newPost: Post = {
    id: 0,
    name:this.user.name,
    content: '',
    likes: 0,
    comments: [],
    showComments: true,
    timestamp: new Date()
  };

  addPost() {
    if (this.newPost.content.trim()) {
      console.log(this.newPost.name,this.user.name);
      const postToAdd = { ...this.newPost, id: this.posts.length + 1, timestamp: new Date() };
      this.postService.addPost(this.newPost).subscribe(() => {
        this.posts.push(this.newPost);
        this.newPost = {
          id: 0,
          name:this.user.name,
          content: '',
          likes: 0,
          comments: [],
          showComments: true,
          timestamp: new Date()
        };
      });
    }
  }
  goToFeed() {
    this.router.navigate(['/feed']);
  }
}
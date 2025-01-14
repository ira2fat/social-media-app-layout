import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Post } from '../../services/mock.backend.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatFormFieldModule, MatToolbarModule, MatListModule,FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit, OnDestroy {
  newComment: string = '';
  feedPosts: Post[] = [];
  private destroy$ = new Subject<void>();

  constructor(private postService: PostService, private router:Router) {}
  



  ngOnInit(): void {
    this.loadFeedPosts();
  }

  loadFeedPosts():void{
    this.postService.getPosts().pipe(takeUntil(this.destroy$)).subscribe(posts=>{
      this.feedPosts=posts;
    });
   }

  likePost(post: Post) {
    post.likes += 1;
  }

  addComment(post: Post, comment: string) {
    post.comments.push(comment);
  }

  toggleComments(post: any): void {

    post.showComments = !post.showComments;

  }
  addPost(content: string, mediaFile: File | null) {

    const newPost: Post = {
      id: this.feedPosts.length + 1,
      content,
      name:'',
      likes: 0,
      comments: [],
      showComments: false,
      timestamp: new Date()
    };
    this.postService.addPost(newPost).subscribe(post =>{
      this.feedPosts.push(post);
    })
  }
  goToProfile(){
    this.router.navigate(['/profile']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
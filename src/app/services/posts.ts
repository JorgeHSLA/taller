import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private apiUrl = 'https://dummyjson.com/posts';
  private commentsUrl = 'https://dummyjson.com/comments';

  constructor(private http: HttpClient) {}

  getPostsByUser(userId: number) {
    return this.http.get<{ posts: Post[] }>(
      `${this.apiUrl}/user/${userId}`
    );
  }

  getCommentsByPost(postId: number) {
    return this.http.get<{ comments: Comment[] }>(
      `${this.commentsUrl}/post/${postId}`
    );
  }
}

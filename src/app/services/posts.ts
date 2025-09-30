import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { map, Observable } from 'rxjs';
import { Comment } from '../models/Comment'; 

@Injectable({ providedIn: 'root' })
export class PostsService {
  private apiUrl = 'https://dummyjson.com/posts';
  private commentsUrl = 'https://dummyjson.com/comments';

  constructor(private http: HttpClient) {}

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http
      .get<{ posts: Post[] }>(`${this.apiUrl}/user/${userId}`)
      .pipe(map((res) => res.posts)); // 👈 aquí extraes el array
  }

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http
      .get<{ comments: Comment[] }>(`${this.commentsUrl}/post/${postId}`)
      .pipe(map((res) => res.comments)); // 👈 igual aquí
  }
}

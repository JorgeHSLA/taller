import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { UsersService } from '../services/users';
import { PostsService } from '../services/posts';
import { forkJoin, map, switchMap } from 'rxjs';

export type PostWithComments = Post & { comments?: Comment[] };

@Component({
  selector: 'app-usuario-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-posts.html',
  styleUrl: './usuario-posts.css'
})
export class UsuarioPosts implements OnChanges {
  @Input() username: string = '';
  posts: PostWithComments[] = [];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService
  ) {}

  ngOnChanges() {
    if (this.username) {
      this.loadPostsAndComments();
    }
  }

  private loadPostsAndComments() {
    this.usersService.getUserByUsername(this.username).pipe(
      switchMap((user) => {
        if (!user) throw new Error('Usuario no encontrado');
        return this.postsService.getPostsByUser(user.id);
      }),
      switchMap((response) => {
        const posts: Post[] = response;
        if (!posts.length) return [posts];

        const postsWithComments$ = posts.map(post =>
          this.postsService.getCommentsByPost(post.id).pipe(
            map(comments => ({ ...post, comments }))
          )
        );

        return forkJoin(postsWithComments$);
      })
    ).subscribe({
      next: (postsConComentarios) => {
        this.posts = postsConComentarios;
        console.log('Posts con comentarios:', this.posts);
      },
      error: (err) => console.error('Error cargando posts y comentarios:', err)
    });
  }
}

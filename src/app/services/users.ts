import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'https://dummyjson.com/users';

  user$: Observable<any> = new Observable();


  constructor(private http: HttpClient) {}

  // buscar usuario por username
  getUserByUsername(username: string): Observable<User> {
  return this.http.get<{ users: User[] }>(`${this.apiUrl}/search?q=${username}`)
    .pipe(
      map(response => {
        const user = response.users.find(u => u.username === username);
        if (!user) {
          throw new Error('Usuario no encontrado');
        }
        return user;
      })
    );
}

  getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);       // devuelve de una vez el observable con el usuario
  }


  getAllUsers() {
    return this.http.get<{ users: User[] }>(this.apiUrl);
  }


}

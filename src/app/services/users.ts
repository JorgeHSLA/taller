import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { U } from '@angular/cdk/keycodes';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'https://dummyjson.com/users';

  user$: Observable<any> = new Observable();


  constructor(private http: HttpClient) {}

  // buscar usuario por username
  getUserByUsername(username: string) {
    return this.http.get<{ users: User[] }>(                   
      `${this.apiUrl}/filter?key=username&value=${username}`
    );
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);       // devuelve de una vez el observable con el usuario
  }


  getAllUsers() {
    return this.http.get<{ users: User[] }>(this.apiUrl);
  }


}

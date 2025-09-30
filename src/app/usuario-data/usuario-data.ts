import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { UsersService } from '../services/users';
import { User } from '../models/User';


@Component({
  selector: 'app-usuario-data',
  imports: [OverlayModule, ReactiveFormsModule],
  templateUrl: './usuario-data.html',
  styleUrl: './usuario-data.css'
})
export class UsuarioData {
  @Input() username: string = '';

  constructor(private usersService: UsersService) {
      this.loadUser();
  }

  user!: User | null;

  loadUser() {
    if (!this.username) return; // Evita llamadas innecesarias

    this.usersService.getUserByUsername(this.username).subscribe({
      next: (user) => {
        this.user = user; // Ahora recibimos directamente el User
        console.log('Usuario cargado:', this.user);
      },
      error: (err) => console.error('Error cargando usuario:', err)
    });
  }
  ngOnChanges() {
    if (this.username) {
      // Aquí puedes cargar los datos del usuario cuando cambie el username
      console.log('Username recibido en UsuarioData:', this.username);
      this.loadUser()
    }
  }
}
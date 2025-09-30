import { Component, computed, signal, Output, EventEmitter } from '@angular/core';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users';
import { User } from '../models/User';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [OverlayModule, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Output() userSelected = new EventEmitter<string>();

  isOpen = signal(false);

  autoCompleteControl = new FormControl('');

  autoCompleteValueChanges = toSignal<string>(this.autoCompleteControl.valueChanges.pipe(map((value) => value || '')));

  userList: User[] = [];

  constructor(private usersService: UsersService) {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.userList = res.users;
        console.log('Usuarios cargados:', this.userList);
      },
      error: (err) => console.error('Error cargando usuarios:', err)
    });
  }

  userListFilter = computed(() => {
    const value = this.autoCompleteValueChanges() || '';
    return this.userList.filter(user =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
  });





  position: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 5
    }
  ];

  handleFocus() {
    this.isOpen.set(true);
  }

  handleBlur() {
    setTimeout(() => {
      this.isOpen.set(false);
    }, 200);
  }

  selectUser(username: string) {
    this.autoCompleteControl.setValue(username);
    this.isOpen.set(false);
    this.userSelected.emit(username); // Emitimos el username seleccionado al padre

  }
}
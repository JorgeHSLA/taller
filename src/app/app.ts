import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { UsuarioData } from "./usuario-data/usuario-data";
import { UsuarioPosts } from "./usuario-posts/usuario-posts";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, Navbar, UsuarioData, UsuarioPosts],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

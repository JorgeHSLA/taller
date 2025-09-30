import { Routes } from '@angular/router';
import path from 'path';
import { Navbar } from './navbar/navbar';
import { UsuarioData } from './usuario-data/usuario-data';
import { UsuarioPosts } from './usuario-posts/usuario-posts';

export const routes: Routes = [
    {path:'', component:Navbar},
    {path:'data', component:UsuarioData},
    {path:'posts', component:UsuarioPosts}
];

import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-data',
  imports: [OverlayModule, ReactiveFormsModule],
  templateUrl: './usuario-data.html',
  styleUrl: './usuario-data.css'
})
export class UsuarioData {

}

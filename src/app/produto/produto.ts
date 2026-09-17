import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  imports: [Navbar, RouterLink],
  selector: 'app-produto',
  styleUrl: './produto.scss',
  templateUrl: './produto.html',
})
export class Produto {}

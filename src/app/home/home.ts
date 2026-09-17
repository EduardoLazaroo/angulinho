import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  imports: [Navbar, RouterLink],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}

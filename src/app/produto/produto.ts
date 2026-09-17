import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Product, ProdutoService } from '../produto.service';

@Component({
  imports: [DecimalPipe, FormsModule, Navbar, RouterLink],
  selector: 'app-produto',
  styleUrl: './produto.scss',
  templateUrl: './produto.html',
})
export class Produto implements OnInit {
  products: Product[] = [];
  name = '';
  price = 0;

  constructor(private readonly produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.produtoService.list().subscribe((products) => {
      this.products = products;
    });
  }

  saveProduct(): void {
    const product = { name: this.name, price: this.price };

    this.produtoService.create(product).subscribe(() => {
      this.resetForm();
      this.loadProducts();
    });
  }

  resetForm(): void {
    this.name = '';
    this.price = 0;
  }
}

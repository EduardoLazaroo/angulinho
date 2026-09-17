import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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
  description = '';
  price = 0;
  stock = 0;
  editingId: number | null = null;
  loading = false;
  message = '';
  errorMessage = '';

  constructor(private readonly produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.produtoService.list().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = error.error?.message ?? 'Não foi possível carregar os produtos.';
      },
    });
  }

  saveProduct(): void {
    this.loading = true;
    this.message = '';
    this.errorMessage = '';
    const product = { name: this.name, description: this.description, price: this.price, stock: this.stock };
    const request = this.editingId === null
      ? this.produtoService.create(product)
      : this.produtoService.update(this.editingId, product);

    request.subscribe({
      next: () => {
        this.message = this.editingId === null ? 'Produto cadastrado com sucesso!' : 'Produto atualizado com sucesso!';
        this.resetForm();
        this.loadProducts();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = error.error?.message ?? 'Não foi possível salvar o produto.';
      },
    });
  }

  editProduct(product: Product): void {
    this.editingId = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.message = '';
    this.errorMessage = '';
  }

  deleteProduct(id: number): void {
    if (!confirm('Deseja excluir este produto?')) {
      return;
    }

    this.loading = true;
    this.produtoService.delete(id).subscribe({
      next: () => {
        this.message = 'Produto excluído com sucesso!';
        this.loadProducts();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = error.error?.message ?? 'Não foi possível excluir o produto.';
      },
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.name = '';
    this.description = '';
    this.price = 0;
    this.stock = 0;
  }
}

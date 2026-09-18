import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Product, ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto-detalhe',
  imports: [DecimalPipe, FormsModule, Navbar, RouterLink],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.scss',
})
export class ProdutoDetalhe implements OnInit {
  product: Product | null = null;
  name = '';
  price = 0;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly produtoService: ProdutoService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.produtoService.getById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.name = product.name;
        this.price = product.price;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Produto não encontrado.';
        this.changeDetector.markForCheck();
      },
    });
  }

  updateProduct(): void {
    if (!this.product) {
      return;
    }

    this.produtoService.update(this.product.id, { name: this.name, price: this.price }).subscribe({
      next: () => this.router.navigateByUrl('/produtos'),
      error: () => {
        this.errorMessage = 'Não foi possível atualizar o produto.';
      },
    });
  }

  deleteProduct(): void {
    if (!this.product || !confirm('Deseja excluir este produto?')) {
      return;
    }

    this.produtoService.delete(this.product.id).subscribe({
      next: () => this.router.navigateByUrl('/produtos'),
      error: () => {
        this.errorMessage = 'Não foi possível excluir o produto.';
      },
    });
  }
}

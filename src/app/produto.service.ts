import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export type ProductPayload = Omit<Product, 'id'>;

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly baseUrl = 'http://localhost:3000/products';

  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: ProductPayload) {
    return this.http.post<Product>(this.baseUrl, product);
  }

  update(id: number, product: ProductPayload) {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

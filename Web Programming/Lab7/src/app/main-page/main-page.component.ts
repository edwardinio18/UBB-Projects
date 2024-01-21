import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @ViewChild('quantityError', { static: false }) quantityError!: ElementRef;
  quantityErrorMessage = 'Quantity must be greater than 0';

  categories: string[] = [];
  products: any[] = [];
  cartItems: any[] = [];
  currentPage = 1;
  totalPages = 0;
  selectedCategory = '';
  totalQuantity = 0;
  totalPrice = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchCategories();
    this.fetchCartItems();
  }

  fetchCategories() {
    this.http.get<string[]>('https://web.shop/php/api?action=getCategories')
      .subscribe(
        (response) => {
          this.categories = response;
        },
        error => {
          console.log('Failed to fetch categories. Error: ' + error);
        }
      );
  }

  loadProductsByPage(page: number) {
    this.currentPage = page;
    if (this.selectedCategory == 'Home & Decor') {
      this.selectedCategory = 'Home%20%26%20Decor';
    }
    const url = 'https://web.shop/php/api?action=getProductsByPage&page=' + page + '&category=' + this.selectedCategory;
    this.http.get<any[]>(url)
      .subscribe(
        (response) => {
          this.products = response;
          this.updatePagination();
        },
        error => {
          console.log('Failed to fetch products. Error: ' + error);
        }
      );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.loadProductsByPage(this.currentPage);
  }

  addToCart(productId: number) {
    const url = 'https://web.shop/php/api?action=addToCart&productId=' + productId;
    this.http.get<any[]>(url)
      .subscribe(
        (response) => {
          this.cartItems = response;
          this.updateCartTotal();
        },
        (error) => {
          console.log('Failed to add item to cart. Error: ' + error);
        }
      );
  }

  removeFromCart(cartItemId: number) {
    const url = 'https://web.shop/php/api?action=removeFromCart&cartItemId=' + cartItemId;
    this.http.get<any[]>(url)
      .subscribe(
        (response) => {
          this.cartItems = response;
          this.updateCartTotal();
        },
        (error) => {
          console.log('Failed to remove item from cart. Error: ' + error);
        }
      );
  }

  clearCart() {
    const url = 'https://web.shop/php/api?action=clearCart';
    this.http.get<any[]>(url)
      .subscribe(
        (response) => {
          this.cartItems = response;
          this.updateCartTotal();
        },
        (error) => {
          console.log('Failed to clear cart. Error: ' + error);
        }
      );
  }

  updateCartItemQuantity(cartItemId: number, quantity: number) {
    if (quantity < 0) {
      const quantityErrorElement = this.quantityError.nativeElement;
      quantityErrorElement.style.display = 'block';
      setTimeout(() => {
        quantityErrorElement.style.display = 'none';
      }, 3000);
    } else {
      const url = 'https://web.shop/php/api?action=updateCartItemQuantity&cartItemId=' + cartItemId + '&quantity=' + quantity;
      this.http.get<any[]>(url)
        .subscribe(
          (response) => {
            this.cartItems = response;
            this.updateCartTotal();
          },
          (error) => {
            console.log('Failed to update cart item quantity. Error: ' + error);
          }
        );
    }
  }

  fetchCartItems() {
    const url = 'https://web.shop/php/api?action=getCartItems';
    this.http.get<any[]>(url)
      .subscribe(
        (response) => {
          this.cartItems = response;
          this.updateCartTotal();
          this.setProductNames();
        },
        (error) => {
          console.log('Failed to fetch cart items. Error: ' + error);
        }
      );
  }

  setProductNames() {
    for (const cartItem of this.cartItems) {
      const product = this.getProduct(cartItem.product_id);
      if (product) {
        cartItem.productName = product.name;
      }
    }
  }

  updateCartTotal() {
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const cartItem of this.cartItems) {
      totalQuantity += cartItem.quantity;
      totalPrice += cartItem.price * cartItem.quantity;
    }

    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  updatePagination() {
    const url = 'https://web.shop/php/api?action=getTotalPages&category=' + this.selectedCategory;
    this.http.get<number>(url)
      .subscribe(
        (response) => {
          this.totalPages = response;
        },
        error => {
          console.log('Failed to fetch total pages. Error: ' + error);
        }
      );
  }

  getProduct(productId: number): any {
    for (const product of this.products) {
      if (product.id == productId) {
        return product;
      }
    }
  }

  decreaseFromCart(cartItemId: number, quantity: number) {
    const url = 'https://web.shop/php/api?action=updateCartItemQuantity&cartItemId=' + cartItemId + '&quantity=' + (quantity - 1);
    this.http.get<any[]>(url)
      .subscribe(
        (response) => {
          this.cartItems = response;
          this.updateCartTotal();
        },
        (error) => {
          console.log('Failed to update cart item quantity. Error: ' + error);
        }
      );
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';


@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    StarRatingComponent,
    NotFoundComponent
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  
  /**
   * CONSTRUCTOR TEMPLATE DIGANTI DGN INJECT DI ANGULAR 17 ONWARDS
   */
  foodService = inject(FoodService);
  activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private router = inject(Router)

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"])
      //this.food = this.foodService.getFoodById(params["id"]);
      this.foodService.getFoodById(params["id"]).subscribe({
        next: serverFood => { this.food = serverFood; },
        error: err => { console.log(err)}
      });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}

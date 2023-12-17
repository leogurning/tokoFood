import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';

/**
 * 
 * @param name 
 * @returns 

function getPathParam$(name: string): Observable<string> {
  const activatedRoute = inject(ActivatedRoute);
  return activatedRoute.params.pipe(
    map((params) => params[name])
  );
}
 */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    StarRatingComponent, 
    SearchComponent,
    TagsComponent,
    NotFoundComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
//export class HomeComponent {  
  foods:Food[] = [];
  /**
   * CONSTRUCTOR TEMPLATE DIGANTI DGN INJECT DI ANGULAR 17 ONWARDS
   */
  foodService = inject(FoodService);
  activatedRoute = inject(ActivatedRoute);

  //params$ = signal(this.activatedRoute.params);
  /**
   * Untuk captured activated Route observable, gunakan toSignal
   * Signal blm diperlukan saat ini
   */
  //params$ = toSignal(this.activatedRoute.params);
  //foods = signal<Food[]>([]);

  /**
   * Setelah data signal observable activated route diperoleh
   * lakukan process utk get data, or any necessary process
   * computed belum diperlukan dalam hal ini karena nature nya hny 1 process
   * setelah signal, tidak sama dgn onInit
   * 
  foods = computed(() => {
    let ifoods:Food[] = [];
    let foodsObservable: Observable<Food[]>;
    let params = this.params$(); 

    if (params) {
      if (params["searchTerm"]) {
        //ifoods = this.foodService.getAllFoodsBySearchTerm(params["searchTerm"]);
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params["searchTerm"]);
      } else if (params["tag"]) {
        //ifoods = this.foodService.getAllFoodsByTag(params["tag"]);
        foodsObservable = this.foodService.getAllFoodsByTag(params["tag"]);
      } else
        //ifoods = this.foodService.getAll();
        foodsObservable = this.foodService.getAll();
      
      foodsObservable.subscribe((serverFood) => {
        ifoods = serverFood;
      }) 
      return ifoods;
    } else {
      return [];
    }   
  });
  */
  /**
   * 
    onInit Life cycle hook msh diperlukan untuk initialisasi data utk ditampilkan
    before web displayed.
    Setelah data signal observable activated route diperoleh
    lakukan process utk get data, or any necessary process  
  */
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    let foodsObservable: Observable<Food[]>;
    // Pls use new observable subscribe template as below. Must define next: & error:
    this.activatedRoute.params.subscribe({ 
      next: (params) => {
          if (params["searchTerm"]) {
            foodsObservable = this.foodService.getAllFoodsBySearchTerm(params["searchTerm"]);
          } else if (params["tag"]) {
            foodsObservable = this.foodService.getAllFoodsByTag(params["tag"]);
          } else
            foodsObservable = this.foodService.getAll();
          
          foodsObservable.subscribe({
            next: (serverFood) => {
              this.foods = serverFood;
            },
            error: (err) => {
              console.log(err);    
              /** PLZ define to handle error later on. Example as below: 
              this.loading = false;
              this.router.navigate(['/errorpage']);
              const errResponse = (err as ServiceErrorResponse);
              this.toastr.error(errResponse.message);
              */
            }  
          });
         },
        error: (err) => {
          console.log(err);
          /** PLZ define to handle error later on. Example as below: 
          this.loading = false;
          this.router.navigate(['/errorpage']);
          const errResponse = (err as ServiceErrorResponse);
          this.toastr.error(errResponse.message);
          */
        }
      });

  }
  /**
   * example new subsribe arguments
   * 
     import { of } from 'rxjs';

      // recommended 
      of([1,2,3]).subscribe((v) => console.info(v));
      // also recommended
      of([1,2,3]).subscribe({
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => console.info('complete') 
      })
   */

  /**
   * 
  pathParams$ = getPathParam$("searchTerm");
  
  fetchData(){
    this.pathParams$.subscribe((searchTerm) => {
      if (searchTerm) 
      this.foods = this.foodService.getAllFoodsBySearchTerm(searchTerm)
      else
      this.foods = this.foodService.getAll();
    })
    
  }
  */
}

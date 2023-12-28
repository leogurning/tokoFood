import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { Observable, catchError, map } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private http = inject(HttpClient);
  private headerOptions;

  constructor() { 
    // Set header information
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.headerOptions = { headers: headers,
      observe: 'body', };
  }

  getAll(): Observable<Food[]> {
    //return sample_food;
    return this.http.get<Food[]>(FOODS_URL, <Object>this.headerOptions)
      .pipe(
        map((response) => {
          return response
        }),
        catchError((err) => {
          //new catch error definition. throwError is deprecated
          throw `Error in data service. Details: ${err.message} > ${JSON.stringify(err.error)}`;
        })
      );
      //}),catchError((err) => throwError(() => err)));
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    // Add safe, URL encoded search parameter if there is a search term
    /** 
     * Add safe, URL encoded search parameter (queryParam) if there is a search term
     * <host>/<path>/<param>?<queryParam>

      const urlParams = new HttpParams()
              .set('searchText', searchText)
              .set('status', status ? status : '');

      this.headerOptions.params = urlParams;
     */
    //return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
      .pipe(
        map( response => { return response; }),
        catchError(err => { throw `Error in data service. Details: ${err.message} > ${JSON.stringify(err.error)}`; })
      );
  }

  getAllTags(): Observable<Tag[]> {
    //return sample_tags;
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
    .pipe(
      map( response => { return response; }),
      catchError(err => { throw `Error in data service. Details: ${err.message} > ${JSON.stringify(err.error)}`; })
    );
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === "All" ?
      this.getAll() :
      this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
      .pipe(
        map( response => { return response; }),
        catchError(err => { throw `Error in data service. Details: ${err.message} > ${JSON.stringify(err.error)}`; })
      );
      //this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId:string): Observable<Food> {
    //return this.getAll().find(food => food.id == foodId) ?? new Food();
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId)
    .pipe(
      map( response => { return response; }),
      catchError(err => { throw `Error in data service. Details: ${err.message} > ${JSON.stringify(err.error)}`; })
    );
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  
  searchTerm = '';
  /**
   * 
   * @param activatedRoute 
   * @param router 
   
  constructor(activatedRoute:ActivatedRoute,private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params["searchTerm"]) this.searchTerm = params["searchTerm"];
    });
  }
  */
 
  /**
   * CONSTRUCTOR TEMPLATE DIGANTI DGN INJECT DI ANGULAR 17 ONWARDS
  */
  activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params["searchTerm"]) this.searchTerm = params["searchTerm"];
    });
  }

  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+ term);
  }
}

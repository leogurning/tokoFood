import { Component, OnInit, inject } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {

  tags?: Tag[];
  foodService = inject(FoodService);
  
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    //this.tags = this.foodService.getAllTags();
    this.foodService.getAllTags().subscribe({
      next: serverTags => { this.tags = serverTags; },
      error: err => { console.log(err); }
    });
  }
}

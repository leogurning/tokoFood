import { Component, OnInit, inject } from '@angular/core';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { radioFavorites, statuses } from '../../../../data';
import { RadioInputComponent } from '../../partials/radio-input/radio-input.component';
import { CheckboxInputComponent } from '../../partials/checkbox-input/checkbox-input.component';
import { CheckboxConfig } from '../../../shared/models/CheckboxConfig';
import { SelectInputComponent } from '../../partials/select-input/select-input.component';
import { TagInputModule } from 'ngx-chips';
import { domainToASCII } from 'node:url';

@Component({
  selector: 'app-entry-food',
  standalone: true,
  imports: [
    TitleComponent,
    TextInputComponent,
    RadioInputComponent,
    CheckboxInputComponent,
    SelectInputComponent,
    DefaultButtonComponent,
    TagInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './entry-food.component.html',
  styleUrl: './entry-food.component.css'
})
export class EntryFoodComponent implements OnInit {
  entryFoodForm!: FormGroup;
  isSubmitted = false;
  private formBuilder = inject(FormBuilder);
  private foodService = inject(FoodService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  returnUrl = '';

  ngOnInit(): void {
    this.entryFoodForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      cookTime: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.maxLength(5)]],
      favorite: [false, Validators.required],
      stars: ['', Validators.required],
      origins: ['', Validators.required],
      tags: ['', Validators.required],
      status: [this.statuses[0].id, Validators.required],
      imageUrl: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];  
  }

  get fc() {
    return this.entryFoodForm.controls;
  }

  get statuses() {
    return statuses;
  }
  /** 
  get radioFavorites() {
    return radioFavorites;
  }
  */
  get radioFavorite(): CheckboxConfig {
    return { name: 'favorite', label: 'Favorite' }; 
  }

  get cbOrigins() {
    return ['italy', 'persia', 'middle east', 'china', 'germany', 'us', 'belgium', 'france', 'india', 'asia']; 
  }

  get tagItems() {
    return ['Pizza', 'Pasta', 'Parmesan'];
  }

  submit(){
    this.isSubmitted = true;
    if(this.entryFoodForm.invalid) return;

    const fv= this.entryFoodForm.value;
    const foodValue :any = {
      name: fv.name,
      cookTime: fv.cookTime,
      price: parseInt(fv.price),
      favorite: fv.favorite,
      stars: parseFloat(fv.stars),
      origins: fv.origins.map((data:any) => data.value),
      tags: fv.tags.map((data:any) => data.value),
      status: fv.status,
      imageUrl: fv.imageUrl
    };
    console.log(foodValue);
  }
}

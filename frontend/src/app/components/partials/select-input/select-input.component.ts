import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { SelectConfig } from '../../../shared/models/SelectConfig';

@Component({
  selector: 'select-input',
  standalone: true,
  imports: [
    ReactiveFormsModule, //must import ReactiveFormsModule for formControl atribute in the <input>
    InputContainerComponent,
    InputValidationComponent
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css'
})
export class SelectInputComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  @Input()
  label!: string;
  @Input()
  name!: string;
  @Input()
  id!: string;
  @Input()
  configs!: SelectConfig[];

  get formControl() {
    return this.control as FormControl;
  }
}

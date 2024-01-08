import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { RadioConfig } from '../../../shared/models/RadioConfig';

@Component({
  selector: 'radio-input',
  standalone: true,
  imports: [
    ReactiveFormsModule, //must import ReactiveFormsModule for formControl atribute in the <input>
    InputContainerComponent,
    InputValidationComponent
  ],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.css'
})
export class RadioInputComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  @Input()
  label!: string;
  @Input()
  configs!: RadioConfig[];

  get formControl() {
    return this.control as FormControl;
  }
}

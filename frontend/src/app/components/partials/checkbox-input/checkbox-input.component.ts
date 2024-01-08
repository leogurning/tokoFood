import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { CheckboxConfig } from '../../../shared/models/CheckboxConfig';

@Component({
  selector: 'checkbox-input',
  standalone: true,
  imports: [
    ReactiveFormsModule, //must import ReactiveFormsModule for formControl atribute in the <input>
    InputContainerComponent,
    InputValidationComponent
  ],
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.css'
})
export class CheckboxInputComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  @Input()
  label!: string;
  @Input()
  config!: CheckboxConfig;

  get formControl() {
    return this.control as FormControl;
  }

}

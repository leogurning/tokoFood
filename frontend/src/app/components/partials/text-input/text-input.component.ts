import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { FormatNumbersDirective } from '../../../directives/format-numbers.directive';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [
    ReactiveFormsModule, //must import ReactiveFormsModule for formControl atribute in the <input>
    InputContainerComponent,
    InputValidationComponent,
    FormatNumbersDirective
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  @Input()
  label!: string;
  @Input()
  directive: boolean = false;
  @Input()
  type: 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }
}

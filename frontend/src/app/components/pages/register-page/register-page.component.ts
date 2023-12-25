import { Component, OnInit, inject } from '@angular/core';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    TitleComponent,
    TextInputComponent,
    DefaultButtonComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  registerForm!:FormGroup;
  isSubmitted = false;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  
  returnUrl = '';

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]]
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];  
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;
    const user :IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    };

    this.authService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}

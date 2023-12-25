import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RouterModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted = false;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  returnUrl = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [ Validators.required, Validators.email]],
      password:['', Validators.required ]
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

     this.authService.login({
      email:this.fc["email"].value,
      password: this.fc["password"].value })
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: err => {
          console.log(err);
        }
      }); 
  }
}

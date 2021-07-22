import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  credentials: FormGroup;
  hide = true;
  loading = false;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    ) {
      this.credentials = this.fb.group({
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });

     }

  ngOnInit() {
  }

  async login() {
    this.loading = true
    this.authService.signup(this.credentials.value).subscribe(
      async (res) => {
        this.loading = false
        this.router.navigate(['/']);
      },
      async (res) => {
        this.loading = false
        console.log(res);
        alert('signup failed')
      }
    );
  }

  // Easy access for form fields
  get fullName() {
    return this.credentials.get('fullName');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}

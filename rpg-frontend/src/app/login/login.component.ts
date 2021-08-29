import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/auth/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: Boolean;
  error = '';
  loading = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }
  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.getUserInfo().subscribe(res=>{
            localStorage.setItem("user",JSON.stringify(res));
            this.router.navigate(["/account"]);
            this.submitted = false;
          },error=>{
            console.error("Error:",JSON.stringify(error));
            this.error = error.error;
            this.loading = false;
            this.submitted = false;
          });
        },
        error => {
          console.error("Error:",JSON.stringify(error));
          this.error = error.error;
          this.loading = false;
          this.submitted = false;
        },);
  }

}

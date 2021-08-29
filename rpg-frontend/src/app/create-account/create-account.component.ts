import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../services/model/user';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  signup : User;

  signupForm:FormGroup = new FormGroup({
    username: new FormControl('',[Validators.minLength(2)]),
    email: new FormControl('',[Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
    password: new FormControl('',[Validators.minLength(4)]),
  });
  loading = false;
  error = '';
  constructor(private router: Router, private userService : UserService,
    private authenticationService: AuthenticationService) {
    this.signup = new User();
  }
  ngOnInit() {

  }
  signupSubmit() {
    this.signup = this.signupForm.value;

    this.authenticationService.signup(this.signup)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate(["/admin/"]);
            },
            error => {
              this.signupForm.setErrors({"responseError":error.error});
              console.error("Error:",error);
                this.error = error.error;
                this.loading = false;
            });
  }


}

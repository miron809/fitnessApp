import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  maxDate;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  buildForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      birthdate: new FormControl(null, Validators.required),
      agree: new FormControl(false, Validators.requiredTrue)
    });
  }

  submit({value}) {
    this.authService.registerUser({
      email: value.email,
      password: value.password
    });
  }

}

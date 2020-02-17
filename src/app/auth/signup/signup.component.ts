import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;
  maxDate;
  isLoading = false;
  unsubscriber = new Subject<void>();

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.uiService.loadingStateChanged$
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(isLoading => this.isLoading = isLoading);
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

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}

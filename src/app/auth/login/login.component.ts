import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading = false;
  unsubscriber = new Subject<void>();

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.uiService.loadingStateChanged$
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(isLoading => this.isLoading = isLoading);
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      email: new FormControl('admin@email.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)])
    });
  }

  submit({value}) {
    this.authService.login({
      email: value.email,
      password: value.password
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}

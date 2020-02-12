import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter();
  isAuth = false;
  unsubscriber = new Subject<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authChange$
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}

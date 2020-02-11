import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth = false;
  unsubscriber = new Subject<void>();

  @Output() closeSideNav = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authChange$
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(authStatus => {
        this.isAuth = authStatus;
      });
  }

  onClose() {
    this.closeSideNav.emit();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}

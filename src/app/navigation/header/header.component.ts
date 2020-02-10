import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }
}

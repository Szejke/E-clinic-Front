import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../../shared/models/menu-item.model';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit {
  @Input()
  menuItems: MenuItem[];

  constructor() { }

  ngOnInit() {
  }

}

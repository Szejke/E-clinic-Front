import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MenuItem} from '../../shared/models/menu-item.model';
import {SideNavService} from '../../services/side-nav.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  menuItems: Observable<MenuItem[]>;

  constructor(private sideNavService: SideNavService) {
    this.menuItems = this.sideNavService.getMenuItems();
  }

  ngOnInit() {
  }

}

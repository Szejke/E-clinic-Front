import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../../../shared/models/menu-item.model';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss'],
  animations: [
    trigger('collapseChange', [
      state('true',
        style({height: '0', overflow: 'hidden'}),
      ),
      state('false',
        style({height: '*'})
      ),
      transition('* => *', animate('.25s ease-in'))
    ]),
    trigger('iconChange', [
      state('true',
        style({transform: 'rotate( -180deg )'})
      ),
      state('false',
        style({transform: 'rotate( 0deg )'})
      ),
      transition('* => *', animate('.25s'))
    ])
  ]
})
export class SideNavItemComponent implements OnInit {
  @Input()
  menuItem: MenuItem;

  hasChildren: boolean;

  isCollapsed = false;

  ngOnInit() {
    this.hasItemChildren();
  }

  private hasItemChildren() {
    this.hasChildren = this.menuItem.subItems != null && this.menuItem.subItems.length > 0;
  }

}

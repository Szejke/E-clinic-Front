import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {MaterialModule} from '../shared/material-module/material.module';
import {MenuComponent} from './menu/menu.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {RouterModule} from '@angular/router';
import {SideNavService} from '../services/side-nav.service';
import {SideNavListComponent} from './side-nav/side-nav-list/side-nav-list.component';
import {SideNavItemComponent} from './side-nav/side-nav-list/side-nav-item/side-nav-item.component';
import {UsersService} from '../services/users.service';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    MatButtonModule
  ],
  exports: [LayoutComponent],
  declarations: [
    LayoutComponent,
    SideNavComponent,
    MenuComponent,
    ToolbarComponent,
    MenuComponent,
    SideNavListComponent,
    SideNavItemComponent
  ],
  providers: [
    SideNavService,
    UsersService
  ]
})
export class LayoutModule {
}

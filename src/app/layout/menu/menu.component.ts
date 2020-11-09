import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router, private usersService: UsersService) { }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/home/welcome']);
  }

}

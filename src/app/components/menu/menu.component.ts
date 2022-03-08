import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() isLogged: boolean;

  items: MenuItem[];

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.loadItemsMenu();
  }

  loadItemsMenu() {
    this.items = [
      {
        label: 'Home',
        items: [{
          label: 'Home',
          icon: 'pi pi-home',
          command: (event: Event) => { this.home(); }
        }
        ]
      },
      {
        label: 'Dogs',
        items: [{
          label: 'List',
          icon: 'pi pi-bars',
          command: (event: Event) => { this.onClickMenu(); }
        }
        ]
      }
    ];
  }

  onClickMenu() {
    this.router.navigate(['/list']);
  }

  home() {
    this.router.navigate(['/home']);
  }

  logOut() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}

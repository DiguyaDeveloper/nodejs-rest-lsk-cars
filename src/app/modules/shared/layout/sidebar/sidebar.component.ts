import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/admin/home', title: 'Home', icon: 'nc-bank', class: '' },
  { path: '/admin/register', title: 'Entrada', icon: 'nc-bank', class: '' },
  { path: '/admin/exit', title: 'Saída', icon: 'nc-bank', class: '' },
  { path: '/Potato', title: 'Pátio', icon: 'nc-bank', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];
  constructor() { }

  ngOnInit(): void { this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}

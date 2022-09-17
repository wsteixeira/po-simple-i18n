import { Component, OnInit, ViewChild } from '@angular/core';

import {
  PoI18nService,
  PoMenuComponent,
  PoMenuItem,
} from '@po-ui/ng-components';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(PoMenuComponent, { static: true }) menu!: PoMenuComponent;

  logo = './assets/images/po_color_font.png';
  literals: any = {};
  menus: Array<PoMenuItem> = [];
  title!: string;

  constructor(
    private appService: AppService,
    private poI18nService: PoI18nService
  ) {}

  ngOnInit(): void {
    this.appService.getHead().subscribe(); //Apenas para forçar o inicio da API no Heroku antes processo de login;
    this.setMenu();
  }

  setMenu() {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
    this.title = this.literals.pouiApplication;
    this.menu.filter = false; // Forçar a troca do idioma do placeholher do filter
    setTimeout(() => (this.menu.filter = true), 10); // Forçar a troca do idioma do placeholher do filter
    this.menus = [
      {
        icon: 'po-icon po-icon-home',
        label: this.literals.home,
        link: '/home',
        shortLabel: this.literals.home,
      },
      {
        icon: 'po-icon po-icon-users',
        label: this.literals.users,
        link: '/user',
        shortLabel: this.literals.users,
      },
      {
        icon: 'po-icon po-icon-user',
        label: 'Login',
        link: '/login',
        shortLabel: 'Login',
      },
      {
        icon: 'po-icon po-icon-exit',
        label: 'Logout',
        link: '/login',
        shortLabel: 'Logout',
      },
    ];
  }
}

import { Platform } from '@angular/cdk/platform';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoI18nService,
} from '@po-ui/ng-components';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableComponent,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableFilters,
} from '@po-ui/ng-templates';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @ViewChild(PoPageDynamicTableComponent, { static: true })
  dynamicTable!: PoPageDynamicTableComponent;

  readonly actions: PoPageDynamicTableActions = {
    detail: '/user/detail/:id',
    duplicate: '/user/new',
    edit: '/user/edit/:id',
    new: '/user/new',
    remove: true,
    removeAll: true,
  };

  actionsRight!: boolean;
  fields!: Array<PoPageDynamicTableFilters>;
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  pageCustomActions!: Array<PoPageDynamicTableCustomAction>;
  tableCustomActions!: Array<PoPageDynamicTableCustomTableAction>;
  apiService!: string;
  literals: any;
  title!: string;

  constructor(
    private userService: UserService,
    private poI18nService: PoI18nService,
    private platform: Platform
  ) {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit(): void {
    this.actionsRight = !this.platform.IOS && !this.platform.ANDROID;
    this.apiService = this.userService.getEndpoint();
    this.pageCustomActions = [
      {
        label: this.literals.refresh,
        action: this.updateTable.bind(this),
        icon: 'po-icon-refresh',
      },
    ];
    this.title = this.literals.userList;
    this.setBreadcrumb();
    this.setFields();
  }

  private setBreadcrumb(): void {
    this.breadcrumbItem = { label: this.literals.home, link: '/' };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = { label: this.literals.user };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      {
        property: 'firstName',
        label: this.literals.firstName,
        duplicate: true,
      },
      { property: 'lastName', label: this.literals.lastName, duplicate: true },
      { property: 'email', label: this.literals.email, duplicate: true },
      {
        property: 'isActive',
        label: this.literals.active,
        type: 'boolean',
        duplicate: true,
      },
    ];
  }

  private updateTable() {
    this.dynamicTable.updateDataTable();
  }
}

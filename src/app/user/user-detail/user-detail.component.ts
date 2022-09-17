import { Component, OnInit } from '@angular/core';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoI18nService,
} from '@po-ui/ng-components';
import {
  PoPageDynamicDetailActions,
  PoPageDynamicDetailField,
} from '@po-ui/ng-templates';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  readonly actions: PoPageDynamicDetailActions = {
    back: '/user',
    edit: '/user/edit/:id',
    remove: '/user',
  };

  fields!: Array<PoPageDynamicDetailField>;
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  apiService!: string;
  literals: any;
  title!: string;

  constructor(
    private userService: UserService,
    private poI18nService: PoI18nService
  ) {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit() {
    this.apiService = this.userService.getEndpoint();
    this.title = this.literals.userDetail;
    this.setBreadcrumb();
    this.setFields();
  }

  private setBreadcrumb(): void {
    this.breadcrumbItem = { label: this.literals.home, link: '/' };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = {
      label: this.literals.user,
      link: '/user',
    };
    this.breadcrumb.items.push(this.breadcrumbItem);
    this.breadcrumbItem = { label: this.literals.detail };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'firstName', label: this.literals.firstName },
      { property: 'lastName', label: this.literals.lastName },
      { property: 'email', label: this.literals.email },
      { property: 'isActive', label: this.literals.active, type: 'boolean' },
    ];
  }
}

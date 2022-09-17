import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoI18nService,
} from '@po-ui/ng-components';
import {
  PoPageDynamicEditActions,
  PoPageDynamicEditField,
} from '@po-ui/ng-templates';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  readonly actions: PoPageDynamicEditActions = {
    cancel: '/user',
    save: '/user',
    saveNew: '/user/new',
  };

  fields!: Array<PoPageDynamicEditField>;
  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  apiService!: string;
  title!: string;
  currentId: any;
  isUpdate = false;
  literals: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private poI18nService: PoI18nService
  ) {
    this.poI18nService
      .getLiterals()
      .subscribe((literals) => (this.literals = literals));
  }

  ngOnInit(): void {
    this.isUpdate = false;
    this.apiService = this.userService.getEndpoint();

    // Carrega o registro pelo ID
    this.activatedRoute.params.subscribe((pars) => {
      this.currentId = pars['id'];

      // Se nao tiver o ID definido sera um CREATE
      if (this.currentId === undefined) {
        this.isUpdate = false;
        this.title = this.literals.addUser;
      } else {
        this.isUpdate = true;
        this.title = this.literals.editUser;
      }
      this.setBreadcrumb();
    });
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
    this.breadcrumbItem = { label: this.title.split(' ')[0] };
    this.breadcrumb.items.push(this.breadcrumbItem);
  }

  private setFields(): void {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'firstName', label: this.literals.firstName, required: true },
      { property: 'lastName', label: this.literals.lastName, required: true },
      {
        property: 'email',
        label: this.literals.email,
        icon: 'po-icon-mail',
        required: true,
      },
      {
        property: 'password',
        label: this.literals.password,
        secret: true,
        required: true,
      },
      {
        property: 'isActive',
        label: this.literals.active,
        type: 'boolean',
        booleanTrue: this.literals.yes,
        booleanFalse: this.literals.no,
      },
    ];
  }
}

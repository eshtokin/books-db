import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/users.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: object[];
  userForEdite: User = {
    name: '',
    email: '',
    password: '',
    role: null,
    books: [],
    image: '',
    _id: '',
    book_list: []
  };
  okBtnStatus = false; // true - visible; false - hidden


  form = new FormGroup({
    name: new FormControl('', [Validators.required, this.checkName]),
    email: new FormControl('', [Validators.required, this.checkEmail]),
    role: new FormControl('', [Validators.required, this.checkRole]),
  });

  onSubmit() {
    console.warn(this.form);
  }

  checkName(control: FormControl) {
    if (control.value.search(/^[\w]{3,16}$/)) {
      return {
        '' : true
      };
    }
  }

  checkEmail(control: FormControl) {
    if (control.value.search(/^[\w]{3,16}@[\w]{1,16}.[a-z]{1,}$/)) {
      return {
        '' : true
      };
    }
  }

  checkPassword(control: FormControl) {
    if (control.value.search(/^[\w]{4,16}$/)) {
      return {'' : true};
    }
  }

  checkRole(control: FormControl) {
    if (control.value !== 1 && control.value !== 2) {
      return {'' : true};
    }
  }

  // checkBooks(control: FormControl) {
  //   if (control.value )
  // }

  init(): void {
    this.userService.getAllUsers().then(el => {
      this.users = el.data.slice();
    });

  }

  deleteUser(id): void {
    this.userService.delete(id)
    .then(res => {
      this.init();
    });
  }

  selectUser(user: User): void {
    this.okBtnStatus = !this.okBtnStatus;
    this.userForEdite = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      image: user.image,
      _id: user._id,
      book_list: user.book_list
    };
  }

  resetUserForEdite(): void {
    this.userForEdite = {
      _id: '',
      name: '',
      email: '',
      password: '',
      books: [],
      image: '',
      role: null
    };
  }

  okBtn(): void {
    this.okBtnStatus = !this.okBtnStatus;
  }

  editeAction(user: User): void {
    this.selectUser(user);
    this.okBtn();
  }

  okAction(): void {
    this.userService.edit(this.userForEdite._id, this.userForEdite)
    .then(() => {this.init(); });
    this.resetUserForEdite();
    this.okBtn();
  }

  addAction(): void {
    this.userService.registrate(this.userForEdite)
    .then(() => {
      this.init();
      });
    this.resetUserForEdite();
  }

  ngOnInit() {
    this.init();
  }
}
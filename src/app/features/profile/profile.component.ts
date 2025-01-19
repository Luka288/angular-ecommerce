import { Component, inject, KeyValueDiffers } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { baseUser, currUser } from '../shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly userService = inject(UserService);

  // ჭირდება რეფაქტორი
  currUser!: currUser;
  base: baseUser | null = null;
  updateKey: string = '';

  updateTrack = new FormControl('', { nonNullable: true });

  constructor() {
    this.currentUser();
  }

  currentUser() {
    this.userService.currUsr().subscribe((res) => {
      this.base = res.base;
      this.currUser = res.baseInf;
      this.convertObj(this.currUser);
    });
  }

  convertObj(obj: currUser) {
    const information = [
      {
        label: 'First name',
        Key: 'FirstName',
        value: obj.firstName,
      },
      {
        label: 'Last name',
        Key: 'LastName',
        value: obj.lastName,
      },

      {
        label: 'Email',
        Key: 'email',
        value: obj.email,
      },

      {
        label: 'Address',
        Key: 'address',
        value: obj.address,
      },
      {
        label: 'Age',
        Key: 'age',
        value: obj.age,
      },

      {
        label: 'Phone',
        Key: 'phone',
        value: obj.phone,
      },

      {
        label: 'Gender',
        Key: 'gender',
        value: obj.gender,
      },

      {
        label: 'Zipcode',
        Key: 'zipcode',
        value: obj.zipcode,
      },
    ];

    return information;
  }

  updateUser(key: string, updated: string | number) {
    console.log(key, updated);
    if (updated === '') {
      return;
    }

    this.userService.updateUser(key, updated).subscribe((res) => {
      console.log(res);
      if (res) {
        this.updateTrack.reset();
      }
    });
  }
}

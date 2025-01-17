import { Component, inject } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { currentUser } from '../shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly userService = inject(UserService);

  currUser: currentUser | null = null;

  constructor() {
    this.currentUser();
  }

  currentUser() {
    this.userService.currUsr().subscribe((res) => {
      console.log(res);
      this.currUser = res;
    });
  }
}

import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-expected',
  templateUrl: 'expected.page.html',
  styleUrls: ['expected.page.scss']
})
export class ExpectedPage {
  users: any[] = [];
  newUser: any = {}
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.users = await this.userService.getUsers();
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  async addUser() {
    if (this.newUser.name.trim().length > 0) {
      try {
        const addedUser = await this.userService.addUser(this.newUser);
        this.fetchUsers()
        this.newUser = {}; // Reset newUser object
      } catch (error) {
        console.error('Error adding user', error);
      }
    }
  }
  async removeUser(user: any) {
    try {
      await this.userService.removeUser(user.id);
      this.users = this.users.filter(u => u.id !== user.id);
      console.log('User removed:', user);
    } catch (error) {
      console.error('Error removing user', error);
    }
  }
}

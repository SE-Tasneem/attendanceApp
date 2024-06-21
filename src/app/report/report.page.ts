import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss']
})
export class ReportPage {
  users: any[] = [];
  constructor(private userService: UserService) { }
  ionViewWillEnter() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.users = await this.userService.getUsersReport();
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }
}

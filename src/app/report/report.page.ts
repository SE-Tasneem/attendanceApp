import { Component } from '@angular/core';
import { UserService } from '../user.service';
import * as moment from 'moment';
import 'moment/locale/ar';

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss']
})
export class ReportPage {
  users: any[] = [];
  month: string = "";
  constructor(private userService: UserService) { }
  ionViewWillEnter() {
    this.fetchUsers();
  }

  async fetchUsers() {
    moment.locale('ar');
    this.month = moment().format('MMMM');
    try {
      const data = await this.userService.getUsersReport()
      this.users = data.data
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }
}

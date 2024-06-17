import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-attendance',
  templateUrl: 'attendance.page.html',
  styleUrls: ['attendance.page.scss']
})
export class AttendancePage {

  users: any[] = [];
  attendedUser: any = {}
  constructor(private faio: FingerprintAIO, private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
  }
  ionViewWillEnter() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.users = await this.userService.getUsers();
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }
  async attendUser(user: any) {
    try {
      await this.userService.markAttendance(user.id);
      this.fetchUsers()
    } catch (error) {
      console.error('Error removing user', error);
    }
  }
  async markAttendance(user: any) {
    try {
      const available = await this.faio.isAvailable();
      if (available) {
        const result = await this.faio.show({
          title: 'Biometric Authentication',
          subtitle: 'Place your finger on the sensor',
          description: 'Please authenticate',
          fallbackButtonTitle: 'Use Backup',
        });
        if (result) {
          const userId = 'user-id-from-authenticated-session'; // Replace with actual user ID
          await this.userService.markAttendance(userId);
          console.log('Attendance marked successfully');
        }
      }
    } catch (error) {
      console.error('Error during fingerprint authentication', error);
    }
  }
}

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import 'moment/locale/ar';

@Component({
  selector: 'app-attendance',
  templateUrl: 'attendance.page.html',
  styleUrls: ['attendance.page.scss']
})
export class AttendancePage {

  users: any[] = [];
  attendedUser: any = {}
  constructor(private faio: FingerprintAIO, private userService: UserService, private alertController: AlertController) { }

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
  async confirmAction(user: any) {
    moment.locale('ar');
    if (!user.latest_attendance || user.latest_attendance == 'undefind' || user.latest_attendance == null) {
      // Get the current weekday in Arabic
      const weekday = moment().format('dddd');
      const alert = await this.alertController.create({
        header: `حضور ${user.name} !`,
        message: `يوم ${weekday} ${moment().format('Y-MM-DD')} الساعة${moment().format('HH:MM')}`,
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'إلغاء',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'تأكيد',
            handler: async () => {
              try {
                const response = await this.userService.markAttendance(user.id);
                this.fetchUsers()
                console.log('Data sent successfully:', response);
              } catch (error) {
                console.error('Error sending data:', error);
              }
            }
          }
        ]
      });

      await alert.present();
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

import { Component } from '@angular/core';
import { UserService } from '../user.service';
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
  constructor( private userService: UserService, private alertController: AlertController) { }

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
}

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api/v1/users'; // Replace with your API URL

  constructor() { }

  async getUsers() {
    try {
      const response = await axios.get(this.apiUrl);
      console.log('users', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching users', error);
      // throw error;
      return [
        {"id":1,"name":"Tasneem","created_at":"2024-06-17T04:48:11.000000Z","updated_at":"2024-06-17T04:48:11.000000Z"},
        {"id":2,"name":"Ah","created_at":"2024-06-17T04:48:51.000000Z","updated_at":"2024-06-17T04:48:51.000000Z"},
        {"id":4,"name":"test","created_at":"2024-06-17T05:04:35.000000Z","updated_at":"2024-06-17T05:04:35.000000Z"},
        {"id":6,"name":"Tasneem Hamed","created_at":"2024-06-17T09:58:17.000000Z","updated_at":"2024-06-17T09:58:17.000000Z"}
      ]

    }
  }
  async getUsersReport() {
    try {
      const response = await axios.get(`${this.apiUrl}-attendance-report`);
      console.log('users', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching users', error);
      return {"error":false,"data":[{"created_at":"2024-06-17","users":[{"user":{"id":1,"name":"Tasneem","created_at":"2024-06-17T04:48:11.000000Z","updated_at":"2024-06-17T04:48:11.000000Z"},"attendance_time":"13:56:41"},{"user":{"id":2,"name":"Ah","created_at":"2024-06-17T04:48:51.000000Z","updated_at":"2024-06-17T04:48:51.000000Z"},"attendance_time":"14:06:18"},{"user":{"id":4,"name":"test","created_at":"2024-06-17T05:04:35.000000Z","updated_at":"2024-06-17T05:04:35.000000Z"},"attendance_time":"14:08:47"},{"user":{"id":6,"name":"Tasneem Hamed","created_at":"2024-06-17T09:58:17.000000Z","updated_at":"2024-06-17T09:58:17.000000Z"},"attendance_time":"18:10:08"}]},{"created_at":"2024-06-18","users":[{"user":{"id":9,"name":"\u0639\u0644\u064a","created_at":"2024-06-17T16:02:10.000000Z","updated_at":"2024-06-17T16:02:10.000000Z"},"attendance_time":"20:38:33"},{"user":{"id":8,"name":"\u0639\u0644\u064a \u0645\u062d\u0645\u062f \u0639\u0644\u064a","created_at":"2024-06-17T16:00:10.000000Z","updated_at":"2024-06-17T16:00:10.000000Z"},"attendance_time":"20:51:22"},{"user":{"id":7,"name":"test data","created_at":"2024-06-17T10:06:06.000000Z","updated_at":"2024-06-17T10:06:06.000000Z"},"attendance_time":"20:51:45"},{"user":{"id":6,"name":"Tasneem Hamed","created_at":"2024-06-17T09:58:17.000000Z","updated_at":"2024-06-17T09:58:17.000000Z"},"attendance_time":"20:54:23"},{"user":{"id":4,"name":"test","created_at":"2024-06-17T05:04:35.000000Z","updated_at":"2024-06-17T05:04:35.000000Z"},"attendance_time":"22:13:34"}]},{"created_at":"2024-06-19","users":[{"user":{"id":10,"name":"\u0639\u0644\u064a \u0627\u062d\u0645\u062f \u0639\u0644\u064a","created_at":"2024-06-19T18:23:45.000000Z","updated_at":"2024-06-19T18:23:45.000000Z"},"attendance_time":"22:24:00"},{"user":{"id":9,"name":"\u0639\u0644\u064a","created_at":"2024-06-17T16:02:10.000000Z","updated_at":"2024-06-17T16:02:10.000000Z"},"attendance_time":"22:24:09"}]},{"created_at":"2024-06-21","users":[{"user":{"id":10,"name":"\u0639\u0644\u064a \u0627\u062d\u0645\u062f \u0639\u0644\u064a","created_at":"2024-06-19T18:23:45.000000Z","updated_at":"2024-06-19T18:23:45.000000Z"},"attendance_time":"06:55:47"},{"user":{"id":9,"name":"\u0639\u0644\u064a","created_at":"2024-06-17T16:02:10.000000Z","updated_at":"2024-06-17T16:02:10.000000Z"},"attendance_time":"06:59:54"}]}]}
      // throw error;
    }
  }
  async addUser(user: any) {
    try {
      const response = await axios.post(this.apiUrl, user);
      return response.data;
    } catch (error) {
      console.error('Error adding user', error);
      throw error;
    }
  }
  async removeUser(userId: string) {
    try {
      const response = await axios.delete(`${this.apiUrl}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing user', error);
      throw error;
    }
  }
  async markAttendance(userId: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/attend/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error attend user', error);
      throw error;
    }
  }
}

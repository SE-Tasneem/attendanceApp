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
      throw error;
    }
  }
  async getUsersReport() {
    try {
      const response = await axios.get(`${this.apiUrl}-attendance-report`);
      console.log('users', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching users', error);
      throw error;
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

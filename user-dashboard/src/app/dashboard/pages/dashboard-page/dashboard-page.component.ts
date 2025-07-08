import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { JwtUtil } from '../../../auth/services/jwt.util';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent implements OnInit {
  users: any[] = [];
  editDialogVisible = false;
  selectedUser: any = null;
  editForm!: FormGroup;
  currentUserRole: 'admin' | 'user' | null = null;
  currentUserEmail: string | null = null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JwtUtil.decodeToken(token);
      this.currentUserRole = payload?.role ?? null;
      this.currentUserEmail = payload?.email ?? null;
    }
  }

  ngOnInit(): void {
    this.dashboardService.getUsers().subscribe({
      next: (data) => (this.users = data.sort((a, b) => a.id - b.id)),
      error: (err) => console.error('Error fetching users', err),
    });
  }

  openEditDialog(user: any) {
    this.selectedUser = { ...user };
    this.editForm = this.fb.group({
      email: [user.email, [Validators.required, Validators.email]],
      role: [user.role, Validators.required],
    });
    this.editDialogVisible = true;
  }

  onEditSubmit() {
    if (this.editForm.invalid || !this.selectedUser) return;
    const { password, ...rest } = this.selectedUser;
    const updatedUser = {
      ...rest,
      ...this.editForm.value,
    };
    this.http
      .put<any>(`http://localhost:3000/user/${updatedUser.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .subscribe({
        next: (user) => {
          this.users = this.users.map((u) => (u.id === user.id ? user : u));
          this.editDialogVisible = false;
          // If the current user changed their own role from admin to user, log them out
          if (
            user.email === this.currentUserEmail &&
            this.currentUserRole === 'admin' &&
            user.role === 'user'
          ) {
            this.logout();
          }
        },
        error: (err) => console.error('Error updating user', err),
      });
  }

  deleteUser() {
    if (!this.selectedUser) return;
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.http
      .delete<any>(`http://localhost:3000/user/${this.selectedUser.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== this.selectedUser.id);
          this.editDialogVisible = false;
        },
        error: (err) => console.error('Error deleting user', err),
      });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}

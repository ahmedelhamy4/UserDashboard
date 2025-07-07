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

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .subscribe({
        next: (data) => (this.users = data),
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
    const updatedUser = {
      ...this.selectedUser,
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
        },
        error: (err) => console.error('Error updating user', err),
      });
  }
}

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,MatToolbarModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  name :string='';
  errorMessage: string = '';
  successMessage: string = '';
  isSignUpMode: boolean = false;

  constructor(private userService: UserService, private router:Router) {}

  // Method to handle login
  login() {
    this.userService.authenticate(this.username, this.password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.errorMessage = '';
        this.redirectToProfile();
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  signUp() {
    this.userService.register(this.username, this.password,this.name).subscribe((isRegistered) => {
      if (isRegistered) {
        this.successMessage = 'Registration successful! You can now log in.';
        this.errorMessage = '';
        this.isSignUpMode = false; // Switch back to login mode after successful signup
      } else {
        this.successMessage = '';
        this.errorMessage = 'Username already exists';
      }
    });
  }
  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  // Toggle between login and signup modes
  toggleSignUpMode() {
    this.isSignUpMode = !this.isSignUpMode;
    this.errorMessage = '';
    this.successMessage = '';
  }
}
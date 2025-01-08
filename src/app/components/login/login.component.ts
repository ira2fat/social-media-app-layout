import { Component, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,MatToolbarModule,FormsModule,CommonModule, MatInputModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  username: string = '';
  password: string = '';
  name :string='';
  errorMessage: string = '';
  successMessage: string = '';
  isSignUpMode: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService, private router:Router) {}

  // Method to handle login
  login() {
    this.userService.authenticate(this.username, this.password).pipe(takeUntil(this.destroy$)).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.errorMessage = '';
        this.redirectToProfile();
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  signUp() {
    this.userService.register(this.username, this.password,this.name).pipe(takeUntil(this.destroy$)).subscribe((isRegistered) => {
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
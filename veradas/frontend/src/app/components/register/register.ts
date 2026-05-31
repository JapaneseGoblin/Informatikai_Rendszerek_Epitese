import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = '';
  password = '';
  passwordAgain = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.password || !this.passwordAgain) {
      this.error = 'Minden mező kitöltése kötelező';
      return;
    }

    if (this.password !== this.passwordAgain) {
      this.error = 'A két jelszó nem egyezik';
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.success = 'Sikeres regisztráció, átirányítás...';
        setTimeout(() => this.router.navigateByUrl('/login'), 1500);
      },
      error: (err) => this.error = err.error?.error || 'Hiba történt'
    });
  }
}
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {

  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = signal('');

  onSubmit() {

    const result = this.auth.login(this.email, this.password);

    if (result.success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error.set(result.message);
    }

  }
}
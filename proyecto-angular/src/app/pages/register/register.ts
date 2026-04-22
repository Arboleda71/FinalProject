import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  error = signal('');
  success = signal('');

  onSubmit() {
    const result = this.auth.register(this.name, this.email, this.password);

    if (result.success) {
      this.success.set(result.message);
      setTimeout(() => this.router.navigate(['/login']), 1000);
    } else {
      this.error.set(result.message);
    }
  }
}
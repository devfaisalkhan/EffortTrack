import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { lastValueFrom } from 'rxjs';
import { HelperService } from '../../../universal/helper.service';
import { HttpStatus } from '../../../universal/shared.model';
import { ComponentsWithFormsModule } from '../../../universal/modules/components-with-forms.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ComponentsWithFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private helperSvc: HelperService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['faisal', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['password', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['password', Validators.required],
        role: ['', Validators.required],
        // terms: [false, Validators.requiredTrue],
      },
      { validators: this.matchPasswords }
    );
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  async onSubmit(data: any) {
    this.helperSvc.presentLoader('Registering...');
    try {
      const resp = await this.authSvc.register(data);
      if (resp.status === HttpStatus.OK) {
        this.registerForm.reset();
        this.helperSvc.presentAlert('Registered successfully.', 'success');
      }
    } catch (er: any) {
      const error = er.error.message
        ? er.error.message
        : 'Something went wrong.';
      this.helperSvc.presentAlert(error, 'error');
    } finally {
      this.helperSvc.dismissLoader();
    }
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasePage } from '../../../universal/base.page';
import { ComponentsWithFormsModule } from '../../../universal/modules/components-with-forms.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ComponentsWithFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent extends BasePage {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    super();
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(data: any) {
    this.helperSvc.presentLoader('Logging in...');
    try {
      const resp = await this.authSvc.login(data);
    } catch (er: any) {
      const msg = er.error.message || 'An error occurred';
      this.helperSvc.presentAlert(msg, 'error');
    } finally {
      this.helperSvc.dismissLoader();
    }
  }
}

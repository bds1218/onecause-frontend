import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginValid = true;
  errorMessage = '';
  loading = false;
  redirectUrl = "http://onecause.com";
  
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    token: new FormControl(''),
  });

  constructor(private readonly client: HttpClientService, private readonly router: Router) { }

  public ngOnInit(): void {
    this.errorMessage = '';
    this.loginValid = true;
  }

  public ngOnDestroy(): void {

  }

  public onSubmit(): void {
    this.loading = true;
    const data: ILoginData = <ILoginData>{
      Username: this.loginForm.get('username')?.value,
      Password: this.loginForm.get('password')?.value,
      Token: this.loginForm.get('token')?.value,
      Offset: new Date().getTimezoneOffset()
    };
    this.client.login(data).subscribe({
      next: () => {
        // dumb, with more time use guard routes/auth service
        window.location.href = this.redirectUrl;
      },
      error: (err: any) => {
        this.loginValid = false;
        this.errorMessage = err;
        this.loading = false;
      }
    });
  }
}

export interface ILoginData {
  Username: string;
  Password: string;
  Token: string;
  Offset: number;
}

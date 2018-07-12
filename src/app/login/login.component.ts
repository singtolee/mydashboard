import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;

  constructor(public auth:AuthService,public router:Router) {
    if(this.auth.user){
      this.router.navigate(['/console']);
    }
  }

  ngOnInit() {
  }

  onSubmit(formData){
    if(formData.valid){
      this.auth.emailLogin(formData.value.email,formData.value.password)
    }
  }

}

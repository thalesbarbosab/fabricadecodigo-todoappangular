import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    password: ''
  };

  constructor(private account_service : AccountService,
              private router : Router) { }

  ngOnInit() {
  }

  async onSubmit(){
    try{
      const resut = await this.account_service.login(this.login);
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }

}

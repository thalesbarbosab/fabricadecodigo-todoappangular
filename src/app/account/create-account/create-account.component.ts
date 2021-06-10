import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private account_service : AccountService,
              private router : Router) { }

  ngOnInit() {
  }

  async onSubmit()
  {
    try{
      const result = await this.account_service.createAccount(this.account);
      this.router.navigate(['login']);
    }
    catch(error){
      console.log(error)
    }
  }

}

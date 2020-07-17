import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Admin} from '../admin.model';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [ApiService] 
})
export class AdminLoginComponent implements OnInit {
  model:any = {};
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    this.apiService.loginAsAdmin(form.value).subscribe( (response)=>{
      JSON.stringify(response);
      console.log(response);
    });
  }

}

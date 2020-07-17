import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  AllJobs:any;
  baseUrl:string = "http://localhost:4200/";
  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs(){
    this.apiService.getJobsList().subscribe( (data)=>{
      this.AllJobs = data;
    })
  }
}

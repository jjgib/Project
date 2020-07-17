import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  id:string;
  job:any;
  baseUrl:any = 'http://localhost:4200';
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute, private apiservice: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe( params =>{
      this.id = params.id;
    });
    this.getDetails();
   }

   getDetails(){
     this.apiservice.getJobDetail(this.id).subscribe( (data)=>{
      this.job = data;
     })
   }

}

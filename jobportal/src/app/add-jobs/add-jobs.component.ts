import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//import {Jobs} from '../job-model';
import {Job} from '../job.model';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css'],
  providers: [ApiService] 
})
export class AddJobsComponent implements OnInit {
  model:any = {};
  msgAlert:boolean = false;
  delMsgAlert:boolean = false;
  alljobs:any;

  jobfieldOptions:any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.resetForm();
    this.getJobFields();
    this.refreshJobList();
  }

  resetForm(form? : NgForm){
    
    if(form)
      form.reset();
    this.apiService.selectedJob = {
      _id:"",
      jobTitle:"",
    jobDescription:"",
    companyName:"",
    jobLocation:"",
    jobField:"",
    employmentType:""

    }
    
  }

  onCreate(form:NgForm){
    if(form.value._id == '' || form.value._id == null){
    /*const jobDetail: Jobs  = {
      jobTitle: form.value.jobTitle,
      jobDescription:form.value.jobDescription,
      companyName:form.value.companyName,
      jobLocation:form.value.jobLocation,
      jobField:form.value.jobField,
      employmentType:form.value.employmentType
    }*/
    this.apiService.saveJobs(form.value).subscribe( (response)=>{
      this.resetForm(form);
      this.refreshJobList();
      console.log(response);
      this.msgAlert = true;
      setTimeout( ()=>{
        this.msgAlert = false;
      },3000);
    })
  }
  else {
    this.apiService.putJob(form.value).subscribe( (response)=>{
      //this.resetForm(form); 
      this.refreshJobList();
      console.log(response);
      this.msgAlert = true;
      setTimeout( ()=>{
        this.msgAlert = false;
      },3000);
    });
  }

  }

  refreshJobList(){
    this.apiService.getJobsList().subscribe( (res)=>{
      this.apiService.jobs = res as Job[];
    });
  }

  getJobFields(){
    this.apiService.getJobFieldList().subscribe( (res)=>{
      this.jobfieldOptions = res;
    });
  }

  onEdit(item : Job){
    this.apiService.selectedJob = item;
  }

  public getJobs(){
    this.apiService.getJobsList().subscribe( (data: Array<object>)=>{
      this.alljobs = data;
      //console.log(this.alljobs);
    })
  }

  onDelete(jobId:string, form:NgForm){
    if(confirm('Are you sure to delete this record ?') == true){
      this.apiService.deleteJob(jobId).subscribe( (response)=>{
        this.refreshJobList();
        this.resetForm(form);
        if(response["deleteStatus"] == "success"){
          this.delMsgAlert = true;
          this.alljobs = "";
          setTimeout( ()=>{
            this.delMsgAlert = false;
          },3000);
        }
      });
    }
  }

}

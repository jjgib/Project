import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//import {Jobs} from '../job-model';
import {JobField} from '../jobfield.model';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-add-job-fields',
  templateUrl: './add-job-fields.component.html',
  styleUrls: ['./add-job-fields.component.css'],
  providers: [ApiService]
})
export class AddJobFieldsComponent implements OnInit {
  model:any = {};
  msgAlert:boolean = false;
  delMsgAlert:boolean = false;
  allfields : any;
  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshJobFieldList();
  }

  resetForm(form? : NgForm){
    
    if(form)
      form.reset();
    this.apiService.selectedJobField = {
      _id:"",
      jobField:""
    }
    
  }

  onCreate(form:NgForm){
    if(form.value._id == ''){
      this.apiService.saveJobField(form.value).subscribe( (res)=>{
        this.resetForm(form);
        this.refreshJobFieldList();
        console.log(res);
        this.msgAlert = true;
        setTimeout( ()=>{
          this.msgAlert = false;
        },3000);
      });
    }
    else {
      this.apiService.putJobField(form.value).subscribe( (res)=>{
        this.resetForm(form);
        this.refreshJobFieldList();
        console.log(res);
        this.msgAlert = true;
        setTimeout( ()=>{
          this.msgAlert = false;
        },3000);
      });
    }
  }

  onEdit(item : JobField){
    this.apiService.selectedJobField = item;
  }

  onDelete(jfId:string, form:NgForm){
    if(confirm('Are you sure want to delete this record?') == true){
      this.apiService.deleteJobField(jfId).subscribe( (res)=>{
        this.refreshJobFieldList();
        if(res['deleteStatus'] == 'success'){
          this.delMsgAlert = true;
          setTimeout( ()=>{
            this.delMsgAlert = false;
          },3000);
        }
      });
    }
  }

  refreshJobFieldList(){
    this.apiService.getJobFieldList().subscribe( (res)=>{
      this.apiService.jobfields = res as JobField[];
    });
  }

}

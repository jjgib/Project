import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Job} from './job.model';
import {JobField} from './jobfield.model';
import {Admin} from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  selectedJob: Job;
  jobs: Job[];
  selectedJobField: JobField;
  jobfields: JobField[];
  readonly baseURL = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getJobDetail(d : string){
    return this.httpClient.get('http://localhost:3000/view/'+d);
  }
  saveJobs(d : Job){
    return this.httpClient.post('http://localhost:3000/save',d);
  }
  getJobsList(){
    return this.httpClient.get('http://localhost:3000/getjobs');
  }

  putJob(d:Job){
    return this.httpClient.put('http://localhost:3000/update/'+d._id, d);
  }

  deleteJob(_id: string){
    return this.httpClient.delete('http://localhost:3000/delete/'+_id);
  }

  saveJobField(d:JobField){
    return this.httpClient.post('http://localhost:3000/savefield',d);
  }

  putJobField(d:JobField){
    return this.httpClient.put('http://localhost:3000/jobfieldupdate/'+d._id, d);
  }

  deleteJobField(_id:string){
    return this.httpClient.delete('http://localhost:3000/deletejobfield/'+_id);
  }

  getJobFieldList(){
    return this.httpClient.get('http://localhost:3000/getjobfields');
  }

  loginAsAdmin(d:Admin){
    return this.httpClient.post('http://localhost:3000/adminLogin', d);
  }
}

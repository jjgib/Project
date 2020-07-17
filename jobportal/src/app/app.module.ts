import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular-6-datatable';

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { AddJobFieldsComponent } from './add-job-fields/add-job-fields.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { HomeComponent } from './home/home.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

const appRoutes:Routes = [
  {path:'', component:HomeComponent},
  {path:'job/:id', component:JobDetailComponent},
  {path:'admin', component:AdminLoginComponent},
  {path:'dashboard',component:AdminDashboardComponent},
  {path:'add-jobs',component:AddJobsComponent},
  {path:'add-job-fields',component:AddJobFieldsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AddJobsComponent,
    AddJobFieldsComponent,
    AdminSidebarComponent,
    HomeComponent,
    JobDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

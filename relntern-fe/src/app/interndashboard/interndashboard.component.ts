import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InternprofileComponent } from '../internprofile/internprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { InternService } from '../intern.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { EdittaskComponent } from '../edittask/edittask.component';
import {TaskStatusComponent } from '../task-status/task-status.component';

@Component({
  selector: 'app-interndashboard',
  templateUrl: './interndashboard.component.html',
  styleUrls: ['./interndashboard.component.css']
})
export class InterndashboardComponent {
 
intern : any;
internDetails: any;
userid : any;
taskdetails: any;
internId: any;
routes: any;
roledes: any;
projectname: any;

constructor(private router: Router, private matDialog: MatDialog, private internService: InternService,private formBuilder: FormBuilder) {}

ngOnInit(): void {
  // this.getInterns();
  this.roledes = localStorage.getItem('role');
  const retrievedInteger:string|null = localStorage.getItem('userId');
  if (retrievedInteger !== null) {
    this.userid = parseInt(retrievedInteger, 10);
    console.log(this.userid);
    this.getTaskById();
    //this.internByUserId();
    }else {
    console.error('Does not exist in localStorage.');
  }
}

  internByUserId(){
    if (this.userid !== undefined) {
      // console.log("method ke andar" + " " + this.userid);
  
      this.internService.getInternByUserId(this.userid).subscribe((resp) => {
        console.log(resp);
        this.internDetails = resp;
        this.internId=this.internDetails.id;
        console.log(this.internId);
        this.getTaskById();
      });
    } else {
      console.error('userid is undefined.');
    }
  }

  // statusChange(){

  // }


  getTaskById(): void{
    console.log(this.internId);
    this.internService.getTaskById(this.userid).subscribe(
      (resp) => {
        console.log(resp);
        this.taskdetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // const myInteger = parseInt(userid, 10);
  // console.log(userid);
  
  // this.validaterole(this.roledesc);

  // internByUserId(){
  //   console.log("method ke andar" +" "+ this.userid);
    
  //   this.internService.getInternByUserId(this.userid).subscribe((resp)=>{
  //     console.log(resp);
  //     // this.intern=resp;
  //     this.openProfile(resp);
      
  //   })
  // }




  openProfile(internDetails: any): void {  
    this.matDialog.open(InternprofileComponent, {
      width: '600px',
      height: '600px',
      data: internDetails,
    });
  }
  openTaskStatus(task: any): void{
    this.matDialog.open(EdittaskComponent,{
      width: '600px',
      height: '600px',
      data: {task},
    })
  }
 
  logout(){
    localStorage.removeItem('role')
    this.router.navigate([``]);
}

goToPage( internsId : any): void {
  console.log(internsId);
  this.router.navigate(['view-task/',internsId]);
  //this.sendData(interns);
}




}


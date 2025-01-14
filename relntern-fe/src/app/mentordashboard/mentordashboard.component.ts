import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InternService } from '../intern.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogBodyComponent } from '../update-dialog-body/update-dialog-body.component';


@Component({
  selector: 'app-mentordashboard',
  templateUrl: './mentordashboard.component.html',
  styleUrls: ['./mentordashboard.component.css']
})
export class MentordashboardComponent {
  userid: any;
  mentoremail11: any;
  mentorDetails: any;   
  internDetails: any;

  constructor(private router: Router, private internservice:InternService,private matDialog: MatDialog) { }


  ngOnInit(): void{
    // this.reloadPage(); 
    // for(let i=0;i<1;i++){
      // this.reloadPage();   
      // break;
    // }
    // location.reload();
    console.log(this.router.url);
    const retrievedInteger:string|null = localStorage.getItem('userId');
    if (retrievedInteger !== null) {
      this.userid = parseInt(retrievedInteger, 10);
     console.log(this.userid);
     this.mentorByUserId();
   } else {
     console.error('Does not exist in localStorage.');
   }
  //  this.InternsByMentor();
  }
  reloadPage() {
    window.location.reload()
  }
//
  mentorByUserId(){
  this.internservice.getMentorByMentoruserid(this.userid).subscribe((data) => {
    console.log(data);
    this.mentorDetails=data;
    this.mentoremail11=data.mentoremail;
    console.log(this.mentoremail11);
    
    this.ActiveInternsByMentor();
  })
  }

  MentorEmail() {
    this.internservice.getMentorByMentorEmail(this.MentorEmail).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);  
          this.mentorDetails = data;
  
          if (data.mentoremail) {
            this.MentorEmail = data.mentoremail;
            console.log(this.MentorEmail);
  
            this.ActiveInternsByMentor();
          } else {
            console.error('Mentor email is not available in the response data');
          }
        } else {
          console.error('No mentor data returned from the service');
        }
      },
    );
  }
  
  ActiveInternsByMentor(): void{
    this.internservice.getActiveByMentor(this.mentoremail11).subscribe((data) => {
      console.log(data);
      this.internDetails=data;
      // this.internName = data.fullname;
      
    })
  }
  openEdit(intern: any): void {
    console.log(intern);
    this.matDialog.open(UpdateDialogBodyComponent, {
      width: '800px',
      height: '700px',
      data: { intern }
    });
  }

  logout(){
    localStorage.removeItem('role')
    localStorage.clear();
    this.router.navigate([``]);
}
  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  gotopage( internsId : any): void {
    console.log(internsId);
    this.router.navigate(['view-task/',internsId]);
    //this.sendData(interns);
  }

}

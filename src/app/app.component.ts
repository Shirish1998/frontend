import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  {Student}  from './student'

@Component(
{
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}
)
export class AppComponent {
  title = 'dataToFrontend';
  studentList:any;
  addStudent : Student= new Student();

  takeStudentObjFromlist(id:number)
  {
    for(let i=0;i<this.studentList.length;i++)
    {
      if(id==this.studentList[i].id)
      {
        this.addStudent.id=this.studentList[i].id;
        this.addStudent.name=this.studentList[i].name;
        this.addStudent.mark=this.studentList[i].mark;
        break;
      }
    }
  }

  
delete(id:number)
{
  this.httpClient.get("http://localhost:8080/deleteStudent"+id).subscribe((list:any)=>
  {
    this.studentList=list;
  });

}
  addMyStudent()
  {
    let url="http://localhost:8080/addStudent";
    this.httpClient.post(url,this.addStudent).subscribe((list:any)=>
    {
                   this.studentList=list;
                   this.addStudent=new Student();
    });
  } 
  constructor(public httpClient: HttpClient)
  {
    httpClient.get("http://localhost:8080/getAll").subscribe((list:any)=>
    {
      this.studentList=list;
    });
  }
   

}


import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupName, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { matSelectAnimations } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matSortAnimations } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { elementAt } from 'rxjs';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  formBuilder: any;
  public pageSize = 5;
  loaded:boolean = false;
  constructor(private httpClient:HttpClient,private userService:UserService,public dialog:MatDialog,private snackBar:MatSnackBar){}
  displayedColumns: string[] = ['No','Id' ,'username' , 'firstName', 'lastName','phoneNumber', 'email','role','status','actions'];
  //ELEMENT_DATA:user[]=[]
  dataSource = new MatTableDataSource<user>();
  editById:boolean[]=[];
  userUpdateForm!: FormGroup;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  @ViewChild('username') username!:ElementRef;
  @ViewChild('firstName') firstname!:ElementRef;
  @ViewChild('lastName') lastname!:ElementRef;

  @ViewChild('role') role!:ElementRef;
  @ViewChild('phoneNumber') phoneNumber!:ElementRef;
  @ViewChild('alertsuccess') alertsuccess!:ElementRef;

 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(
      (event) => console.log(event)
    )
  }

  ngOnInit(){
    
    this.getAllUser();

   
  }
  openSnackBar(message:string){
    this.snackBar.open(message,'',{
      duration:3000
    })
  }
  public handlePage(e:PageEvent):PageEvent{
    this.pageSize = e.pageSize;
    return e;
   
  }

  editThis(index:number){
   
    if(this.editById[index]){
      this.editById = []
      this.editById[index] = false;
    }else{
      this.editById = []
      this.editById[index] = true;
    }
  }

  // update user
  updateChanges(element:user){
    let data = element;
    let updateData:user ={
      id:data.id,
      firstName:this.firstname.nativeElement.value,
      lastName:this.lastname.nativeElement.value,
      username:data.username,
      statusId:data.statusId,
      userTypeId:this.role.nativeElement.value,
      modifiedDate:data.modifiedDate,
      createdDate:data.createdDate,
      email:data.email,
      password:data.password,
      phoneNumber:this.phoneNumber.nativeElement.value

    }
    // let basicInstance = mdb.Alert.getInstance(document.getElementById(this.alertsuccess.nativeElement));
    this.userService.updateUser(updateData).subscribe(result=>{
      console.log(result);
     
      this.getAllUser();
      this.openSnackBar("Successfully Updated")
      
    },error=>{
      
      this.openSnackBar("Update Failed!!")
    })
    this.editById = [];
    
    
    
  }
  

  openDialog(id:number,name:string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {id: id, message: "Are you sure want to delete ",username:name,funId:1},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);

     this.getAllUser()
    });
  }

 
  

  // get All users []
  getAllUser(){
   // this.openSnackBar("Updating...")
    this.userService.getAllUsers.subscribe(data =>{
      console.log(data)
     this.dataSource.data = data;
     this.loaded =true
    },error=>{
      console.log(error)
      this.openSnackBar("Something went wrong!!")
    })

    
    
    
  }
}
import { Component, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  value1 = '';
  value2 = '';
  constructor(
    public dialog: MatDialog,
    public http: HttpClient
  ) {}

  ngOnInit(): void {
  }
  public openDialog(){
    this.dialog.closeAll();
    //this.dialog.open(HomeComponent);

  }

}

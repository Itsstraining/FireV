import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractService } from './../../../services/interact.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {


  constructor(private router: Router,private interactService: InteractService) { }
  collapsed = false;
  ngOnInit(): void {
  
  }
  sideBarOpen = true;
  goToPopularPage(){
    this.router.navigateByUrl('popular');
  }
  goToHomePage(){
    this.router.navigateByUrl('home');
  }
  goToChannelPage(){
    this.router.navigateByUrl('channel');
  }
  turnMenu() {
    this.interactService.turnMenu();
  }
}

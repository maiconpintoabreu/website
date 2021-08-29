import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'rpg-frontend';
  userName = "Player";
  loggedIn = false;
  
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){

  }
  ngAfterViewInit(){
    this.router.events.subscribe(val =>{
      if(val instanceof NavigationEnd){
        this.loggedIn =  this.authService.checkLogin();
        if(this.loggedIn){
          const userInfo = JSON.parse(localStorage.getItem("user"));
          console.log(userInfo);
          this.userName = userInfo.username;
        }
      }
    });
  }
}

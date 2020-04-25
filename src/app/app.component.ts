import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'covid';
  constructor( public register: SessionService, public router: Router){

  }
  ngOnInit() {
let reg = localStorage.getItem('registered');
    if (reg != null) {
      this.register.isRegistered = true;
    }

  }

  ngAfterViewInit() {

    window.alert('Make sure to enable location service from privacy settings');

  }

}

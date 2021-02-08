import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.sass']
})
export class TopnavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  showMenuItems () {
    return this.router.url !== '/home';
  }
}

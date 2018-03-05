import {Component, OnInit} from '@angular/core';

class NavLink {
  title: string;
  link: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  navLinks: NavLink[] = [
    {title: 'Home', link: '/dashboard'},
    {title: 'My Movies', link: '/movies/user'}
  ];

  constructor() { }

  ngOnInit() {
  }

}

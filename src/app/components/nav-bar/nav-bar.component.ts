import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

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

  scrollbarOptions = { axis: 'y', theme: 'minimal' };

  navLinks: NavLink[] = [
    {title: 'Home', link: '/dashboard'},
    {title: 'My Movies', link: '/movies'}
  ];

  constructor() { }

  ngOnInit() {

    $(() => {

      $('#sidebarCollapse').on('click', () => {

        $('#sidebar, #content')   .toggleClass('active');
        $('.collapse.in')         .toggleClass('in');
        $('a[aria-expanded=true]').attr       ('aria-expanded'
                                              , 'false');

      });

    });


  }

}
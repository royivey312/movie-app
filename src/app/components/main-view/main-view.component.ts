import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

class NavLink {
  title: string;
  link: string;
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit {

  constructor() { }

  scrollbarOptions = { axis: 'y', theme: 'minimal' };

  navLinks: NavLink[] = [
    {title: 'Home', link: '/dashboard'},
    {title: 'My Movies', link: '/movies'}
  ];

  ngOnInit() {

    $(document).ready(() => {

      $('#sidebarCollapse').on('click', () => {

        $('#sidebar, #content')   .toggleClass('active');
        $('.collapse.in')         .toggleClass('in');
        $('a[aria-expanded=true]').attr       ('aria-expanded', 'false');

      });

    });
  }

}

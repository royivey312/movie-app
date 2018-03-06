import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';


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

  production = environment.production;

  scrollbarOptions = { axis: 'y', theme: 'minimal' };

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

import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../list';
@Component({
    selector: 'list-disp',
    templateUrl: './list-display.component.html',
    styleUrls: ['./list-display.component.scss']
  })
  export class ListDisplayComponent implements OnInit {
      @Input()
      lists:List[];

      ngOnInit(){
      }
  }
  
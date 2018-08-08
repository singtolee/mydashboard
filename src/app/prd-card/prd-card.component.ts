import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prd-card',
  templateUrl: './prd-card.component.html',
  styleUrls: ['./prd-card.component.css']
})
export class PrdCardComponent implements OnInit {

  @Input() public prd;

  constructor() { }

  ngOnInit() {
  }

}

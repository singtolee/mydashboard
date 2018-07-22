import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-img-zoom',
  templateUrl: './img-zoom.component.html',
  styleUrls: ['./img-zoom.component.css']
})
export class ImgZoomComponent implements OnInit {

  @Input() public image;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

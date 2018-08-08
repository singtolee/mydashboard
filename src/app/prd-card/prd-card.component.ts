import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-prd-card',
  templateUrl: './prd-card.component.html',
  styleUrls: ['./prd-card.component.css']
})
export class PrdCardComponent implements OnInit {

  @Input() public prd;

  dir="PRODUCTS";

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  delprd(key:string){
    this.db.doc(this.dir + '/' + key).delete()
  }

}

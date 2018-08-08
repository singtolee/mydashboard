import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../tools/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prd-list',
  templateUrl: './prd-list.component.html',
  styleUrls: ['./prd-list.component.css']
})
export class PrdListComponent implements OnInit {

  prds:Observable<Product[]>;
  dir = "PPP";

  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.prds = this.db.collection<Product>(this.dir).valueChanges()
  }

}

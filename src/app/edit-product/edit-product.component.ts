import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../tools/Product'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  dir="PRODUCTS";
  products:any;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.products = this.loadPrd()
  }

  loadPrd(){
    return this.db.collection(this.dir, ref=>{
      return ref.orderBy("sales_count","desc")
      .orderBy("score", "desc")
      .orderBy("comment_count", "desc")
      .limit(2)
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return {id,data};
      })
    }))
  }

}

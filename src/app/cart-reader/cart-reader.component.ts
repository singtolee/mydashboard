import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Cart } from '../tools/Cart';

@Component({
  selector: 'app-cart-reader',
  templateUrl: './cart-reader.component.html',
  styleUrls: ['./cart-reader.component.css']
})
export class CartReaderComponent implements OnInit {

  @Input() public id;

  dir="CARTS";
  itemDoc: AngularFirestoreDocument<Cart>
  cart:Observable<Cart>

  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.itemDoc = this.db.doc(this.dir + '/' + this.id)
    this.cart = this.itemDoc.valueChanges()
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImgZoomComponent } from '../img-zoom/img-zoom.component';

interface Order {
  billUrl:string;
  discount:number;
  paymentMe:string;
  grandTotal:number;
  shippingCost:number;
  time:Date;
  total:number;
  uid:string;
  cartArray:string[];
  status:object;
}

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {

  dir="ORDERS";
  orders:Observable<any>;

  constructor(private db: AngularFirestore,private modalService: NgbModal) {}

  ngOnInit() {
    this.orders = this.loadOrders()
  }

  loadOrders(){
    return this.db.collection(this.dir, ref=>{
      return ref.orderBy('time','desc')
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return {id,data};
      })
    }))
  }

  convert(a){
    return a.toDate()
  }

  zoomimg(url:string){
    const modalRef = this.modalService.open(ImgZoomComponent,{centered:true});
    modalRef.componentInstance.image = url;

  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImgZoomComponent } from '../img-zoom/img-zoom.component';

interface Order {
  billUrl:string;
  discount:number;
  done:boolean;
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
      return ref.where('done','==',false)
                .orderBy('time','desc')
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

  s4(id:string){
    this.db.doc(this.dir + '/' + id).update({'status.s4':{time:new Date(),title:'waiting for payment'}})
  }
  s5(id:string){
    this.db.doc(this.dir + '/' + id).update({'status.s5':{time:new Date(),title:'processing'}})
  }
  s6(id:string){
    this.db.doc(this.dir + '/' + id).update({'status.s6':{time:new Date(),title:'shipping to Thailand'}})
  }
  s7(id:string){
    this.db.doc(this.dir + '/' + id).update({'status.s7':{time:new Date(),title:'Delivering'}})
  }
  s8(id:string){
    this.db.doc(this.dir + '/' + id).update({'status.s8':{time:new Date(),title:'done'}})
  }
  s9(id:string){
    this.db.doc(this.dir + '/' + id).update({'status.s9':{time:new Date(),title:'rejected'}})
  }
  s10(id:string){
    this.db.doc(this.dir + '/' + id).update({'status.s99':{time:new Date(),title:'refunded'}})
  }

  archive(id:string){
    console.log(id)
    this.db.doc(this.dir + '/' + id).update({'done':true})
  }

}

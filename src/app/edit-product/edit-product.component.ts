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
      return ref.where('status','==',false)
      .orderBy("sales_count","desc")
      .orderBy("score", "desc")
      .orderBy("comment_count", "desc")
      .limit(1)
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return {id,data};
      })
    }))
  }

  turnon(key:string){
    console.log("turn on" + key)
    this.db.doc(this.dir + '/' + key).update({status:true})
  }

  editSku(key:string,sku){
    this.db.doc(this.dir + '/' + key).update({sku:JSON.parse(sku)})
    //console.log("turn on" + key)
    //console.log("turn KK" + sku)

  }

  editDetail(key:string,detail){
    this.db.doc(this.dir + '/' + key).update({detail:JSON.parse(detail)})
  }
/*
  turnoff(key:string){
    this.db.doc(this.dir + '/' + key).update({status:false})
  }
  */

  removefromhome(key:string){
    this.db.doc(this.dir + '/' + key).update({isHomePagePrd:'no'})
  }

  sendtohomepage(key:string){
    console.log("send to home" + key)
    this.db.doc(this.dir + '/' + key).update({isHomePagePrd:'home'})
  }

  resetUW(newUw:number,key:string){
    this.db.doc(this.dir + '/' + key).update({uw:newUw})
  }

  resetKeyword(kw:string,key:string){
    this.db.doc(this.dir + '/' + key).update({keyword:kw})
  }

  delprd(key:string){
    this.db.doc(this.dir + '/' + key).delete()
  }

  isObject(sth) {
    return typeof sth === 'object';
  }

  json2str(json:any){
    return JSON.stringify(json)

  }

}

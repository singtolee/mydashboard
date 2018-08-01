import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from '../tools/Product'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

interface Category {
  title: string;
  imgUrl:string;
  keyWord:string;
  displayOrder:number;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  categories: Observable<Category[]>;
  private categoriesCol: AngularFirestoreCollection<Category>;
  cdir = "CATEGORIES";

  sk:string;
  onoff:boolean;



  dir="PRODUCTS";
  products:any;
  doc:any;

  constructor(private db: AngularFirestore, private vps: ViewportScroller) {}

  ngOnInit() {
    //this.products = this.loadPrd(this.sta)
    this.categoriesCol = this.db.collection<Category>(this.cdir, ref =>{
      return ref.orderBy('displayOrder')
    });
    this.categories = this.categoriesCol.valueChanges();
  }

  myload(){
    console.log("MMMM???")
    this.products = this.loadwith()
  }

  loadwith(){
    return this.db.collection(this.dir, ref=>{
      return ref.where('status','==',this.onoff)
      .where('keyword','==',this.sk)
      //.orderBy("sales_count","desc")
      //.orderBy("score", "desc")
      //.orderBy("comment_count", "desc")
      .limit(1)
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        this.doc = a.payload.doc;
        return {id,data};
      })
    }))

  }

  loadSta(s:boolean){
    this.products = this.loadPrd(s)
  }

  loadPrd(s:boolean){
    return this.db.collection(this.dir, ref=>{
      return ref.where('status','==',s)
      //.orderBy("sales_count","desc")
      //.orderBy("score", "desc")
     // .orderBy("comment_count", "desc")
      .limit(1)
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        this.doc = a.payload.doc;
        return {id,data};
      })
    }))
  }

  loadNext(s:boolean){
    this.products = this.db.collection(this.dir, ref=>{
      return ref.where('status','==',s)
      .orderBy("sales_count","desc")
      .orderBy("score", "desc")
      .orderBy("comment_count", "desc")
      .startAfter(this.doc)
      .limit(1)
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        this.doc = a.payload.doc;
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

  editTinfo(key:string,sku){
    this.db.doc(this.dir + '/' + key).update({trade_info:JSON.parse(sku)})
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

  resetPrice(pr:string,key:string){
    this.db.doc(this.dir + '/' + key).update({price:pr})
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

  liq(i:string){
    return ",\"image\":\"" + i + "\""
  }

  goup(){
    console.log(this.vps.getScrollPosition())
    this.vps.scrollToPosition([0,0])
    
  }

}

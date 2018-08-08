import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from '../tools/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Category {
  title: string;
  keyWord:string;
  imgUrl:string;
  displayOrder:number;
}

@Component({
  selector: 'app-products-view-by-keyword',
  templateUrl: './products-view-by-keyword.component.html',
  styleUrls: ['./products-view-by-keyword.component.css']
})
export class ProductsViewByKeywordComponent implements OnInit {
  cdir = "CATEGORIES";
  categories: Observable<Category[]>;
  private categoriesCol: AngularFirestoreCollection<Category>;

  kw:string;

  dir="PRODUCTS";
  prds:any;
  doc:any;

  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.categoriesCol = this.db.collection<Category>(this.cdir,ref =>{
      return ref.orderBy('displayOrder')
    });
    this.categories = this.categoriesCol.valueChanges();
  }

  loadprdon(){
    this.prds =  this.db.collection(this.dir, ref=>{
      return ref.where('status','==',true)
      .where('keyword','==',this.kw)
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

  loadprdoff(){
    this.prds = this.db.collection(this.dir, ref=>{
      return ref.where('status','==',false)
      .where('keyword','==',this.kw)
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

  loadNext(){
    this.prds = this.db.collection(this.dir, ref=>{
      return ref.where('status','==',true)
      .where('keyword','==',this.kw)
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

  isObject(sth) {
    return typeof sth === 'object';
  }

  liq(i:string){
    return ",\"image\":\"" + i + "\""
  }

  json2str(json:any){
    return JSON.stringify(json)
  }

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
}

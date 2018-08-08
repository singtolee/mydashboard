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
  selector: 'app-prd-list',
  templateUrl: './prd-list.component.html',
  styleUrls: ['./prd-list.component.css']
})
export class PrdListComponent implements OnInit {

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

  loadprd(){
    this.prds =  this.db.collection(this.dir, ref=>{
      return ref.where('keyword','==',this.kw)
      .limit(8)
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        this.doc = a.payload.doc;
        return {id,data};
      })
    })) 
  }
  loadmore(){
    this.prds =  this.db.collection(this.dir, ref=>{
      return ref.where('keyword','==',this.kw)
      .startAfter(this.doc)
      .limit(8)
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        this.doc = a.payload.doc;
        return {id,data};
      })
    })) 

  }

}

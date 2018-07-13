import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, scan, take, map } from 'rxjs/operators';
import { Product } from './tools/Product';

@Injectable({
  providedIn: 'root'
})
export class LoadProductService {

  dir="PRODUCTS";

  constructor(private db: AngularFirestore) { }

  loadPrd(){
    return this.db.collection(this.dir, ref=>{
      return ref
      .orderBy("sales_count","desc")
      .orderBy("score", "desc")
      .orderBy("comment_count", "desc")
      .limit(6)
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return {id,data};
      })
    }))

  

  } 
}

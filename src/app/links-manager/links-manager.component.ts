import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

interface Link {
  url: string;
  keyword:string;
  order:number;
}
@Component({
  selector: 'app-links-manager',
  templateUrl: './links-manager.component.html',
  styleUrls: ['./links-manager.component.css']
})
export class LinksManagerComponent implements OnInit, OnDestroy {

  links:any;
  dir = "LINKS";
  url:string;
  keyword:string;
  order:number;
  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.links = this.db.collection<Link>(this.dir).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Link;
        const id = a.payload.doc.id;
        return {id,data};
      })
    }))
  }

  ngOnDestroy(){
  }

  del(key:string){
    this.db.doc(this.dir + '/' + key).delete()
  }

  onSubmit(formData) {
    if (formData.valid) {
      const data = {
        url:this.url,
        keyword:this.keyword,
        order:this.order
      }
      this.db.collection(this.dir).add(data).then((success) => {
        this.url = ""
        this.keyword = ""
      })
    }
  }

}

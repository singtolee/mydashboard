import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-banner-manager',
  templateUrl: './banner-manager.component.html',
  styleUrls: ['./banner-manager.component.css']
})
export class BannerManagerComponent implements OnInit, OnDestroy {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  dir = "BANNERIMAGES";

  sub: Subscription
  imgUrl:String
  bimg:Observable<any>

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.bimg = this.db.collection(this.dir).doc('bannerImages').valueChanges()
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  savebannerimg(){
    const data = {bannerImageUrl:this.imgUrl}
    this.db.collection(this.dir).doc('bannerImages').set(data)
  }

  toggleHover(event:boolean){
    this.isHovering = event;
  }

  startUpload(event:FileList){
    const file = event.item(0)
    if(file.type.split('/')[0] !== 'image'){
      return
    }

    const path = `BANNER-IMG/${new Date().getTime()}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path,file);
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(()=>{
        this.downloadURL = ref.getDownloadURL()
        this.sub = this.downloadURL.subscribe(u=>this.imgUrl=u)
      })
    ).subscribe();
  }

  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';


interface TopLevelLink {
  title: string;
  url: string;
  imgUrl:string;
  clickCount:number;
}
@Component({
  selector: 'app-links-manager',
  templateUrl: './links-manager.component.html',
  styleUrls: ['./links-manager.component.css']
})
export class LinksManagerComponent implements OnInit {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  order;

  mobileDir = "MOBILE-TOP-LINKS"
  desktopDir = "TOP-LINKS"

  topLevelLinks: Observable<TopLevelLink[]>;
  private topLevelLinksCol: AngularFirestoreCollection<TopLevelLink>;
  public topLevelLinksTitle: string = "";
  public topLevelLinksUrl: string = "";
  public imgUrl:string = "";
  orderList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.topLevelLinksCol = db.collection<TopLevelLink>('TOP-LINKS');
    this.topLevelLinks = this.topLevelLinksCol.valueChanges();
  }

  toggleHover(event:boolean){
    this.isHovering = event;
  }

  startUpload(event:FileList){
    const file = event.item(0)
    if(file.type.split('/')[0] !== 'image'){
      return
    }

    const path = `LINK-IMG/${new Date().getTime()}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path,file);
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(()=>this.downloadURL = ref.getDownloadURL())
    ).subscribe();
  }

  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  ngOnInit() {
  }

  setUrl(r){
    this.imgUrl = r;
    console.log(this.imgUrl);
  }

  onSubmit(formData) {
    if (formData.valid) {
      const data: TopLevelLink = {
        title: formData.value.topLevelLinksTitle,
        url: formData.value.topLevelLinksUrl,
        imgUrl: this.imgUrl,
        clickCount: 0,
      }
      this.db.collection(this.mobileDir).add(data).then((success) => {
        this.topLevelLinksTitle = '';
        this.topLevelLinksUrl = '';
        this.imgUrl = '';
      })
    }
  }

}

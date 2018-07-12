import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
interface Bank {
  title: string;
  imgUrl:string;
  account:string;
}

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit, OnDestroy {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  dir = "BANKACCOUNTS";

  banks: Observable<Bank[]>;
  private banksCol: AngularFirestoreCollection<Bank>;

  public bankTitle: string;
  public bankAccount: string;
  public imgUrl:string;

  private sub:Subscription;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.banksCol = db.collection<Bank>(this.dir);
    this.banks = this.banksCol.valueChanges();
  }

  toggleHover(event:boolean){
    this.isHovering = event;
  }

  startUpload(event:FileList){
    const file = event.item(0)
    if(file.type.split('/')[0] !== 'image'){
      return
    }

    const path = `BANK-IMG/${new Date().getTime()}`;
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

  onSubmit(formData) {
    if (formData.valid) {
      const data: Bank = {
        title: formData.value.bankTitle,
        imgUrl: this.imgUrl,
        account: formData.value.bankAccount
      }
      this.db.collection(this.dir).add(data).then((success) => {
        this.bankTitle = '';
        this.bankAccount = "";
      })
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }

  }

}

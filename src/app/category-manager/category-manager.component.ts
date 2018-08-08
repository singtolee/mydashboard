import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

interface Category {
  title: string;
  keyWord:string;
  imgUrl:string;
  displayOrder:number;
}

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit,OnDestroy {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  dir = "CATEGORIES";

  categories: Observable<Category[]>;
  private categoriesCol: AngularFirestoreCollection<Category>;
  public categoryTitle: string;
  public keyWord:string;
  public displayOrder:number = 100;
  public imgUrl:string;
  private sub:Subscription;


  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.categoriesCol = db.collection<Category>(this.dir,ref =>{
      return ref.orderBy('displayOrder')
    });
    this.categories = this.categoriesCol.valueChanges();
  
  }

  toggleHover(event:boolean){
    this.isHovering = event;
  }

  startUpload(event:FileList){
    const file = event.item(0)
    if(file.type.split('/')[0] !== 'image'){
      return
    }

    const path = `CATEGORY-IMG/${new Date().getTime()}`;
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
      const data: Category = {
        title: formData.value.categoryTitle,
        keyWord: formData.value.keyWord,
        imgUrl: this.imgUrl,
        displayOrder: formData.value.displayOrder,
      }
      this.db.collection(this.dir).add(data).then((success) => {
        this.categoryTitle = '';
        this.keyWord = '';
        this.displayOrder = 100;
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

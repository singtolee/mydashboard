import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-address-profile',
  templateUrl: './user-address-profile.component.html',
  styleUrls: ['./user-address-profile.component.css']
})
export class UserAddressProfileComponent implements OnInit {

  @Input() public uid
  private userDir = 'USERS'
  private addressDir = "ADDRESSES"
  user:Observable<any>
  address:Observable<any>

  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.user = this.db.doc(this.userDir + '/' + this.uid).valueChanges()
    this.address = this.db.doc(this.addressDir + '/' + this.uid).valueChanges()

  }

}

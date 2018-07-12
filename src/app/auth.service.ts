import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid:string;
  email:string;
  //photoURL?:string;
  //displayName?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Observable<User>;
  error:any;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
                this.user = this.afAuth.authState.pipe(switchMap(user=>{
                  if(user){
                    return this.afs.doc<User>(`USERS/${user.uid}`).valueChanges()
                  }else{
                    return of(null)
                  }
                }))
              }
  
  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  emailLogin(e,p){
    this.afAuth.auth.signInWithEmailAndPassword(e,p).then((credential)=>{
      this.updateUserData(credential.user);
      this.router.navigate(['/console']);
    }).catch((error)=>{
      this.error=error;
    })
  }

  private oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential)=>{
      this.updateUserData(credential.user)
    })
  }

  private updateUserData(user){
    const userRef:AngularFirestoreDocument<any> = this.afs.doc(`USERS/${user.uid}`);

    const data :User = {
      uid: user.uid,
      email: user.email,
      //displayName: user.displayName,
     // photoURL: user.photoURL
    }

    return userRef.set(data, {merge:true})
  }

  signOut(){
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/login']);
    })
  }


}

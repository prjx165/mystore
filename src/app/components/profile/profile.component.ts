import { Component, Input, OnInit } from '@angular/core';
import { doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import app from 'src/app/firebase-init';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  @Input() user_id:any;

  user = {name:'', address:'',mob:'',rating:'',date:''};

  ngOnInit(): void {
    const db = getFirestore(app);
    const userRef = doc(db, 'users' ,this.user_id );
    const user = getDoc(userRef);
    user.then( (e)=> {
        console.log(e.exists());
        if(e.exists()){
          const obj = e.data();
          this.user.name = obj['name'];
          this.user.address = obj['address'];
          this.user.mob = obj['mob_no'];
          this.user.rating = "4 star";
          this.user.date = obj['date'];
        }
    });
    console.log(this.user);

  }

}
